'use strict';
const assert = require('node:assert/strict');
const F = require('../src/engine.js');
const rng = n => () => n;
function rejects(s, action) { const before = JSON.stringify(s); assert(action().error); assert.equal(JSON.stringify(s), before); }
function offer(s, id) { s.offers = [id, ...F.HEXES.map(h => h.id).filter(x => x !== id && !s.hexes.includes(x)).slice(0, 2)]; }
function ready(hexes = []) {
  const s = F.initial(rng(0));
  for (const id of hexes) {
    offer(s, id); s.stock = 5; assert(F.choose(s, id, rng(0)).ok);
    s.freeClaimed = false; s.extraBuys = 0;
  }
  s.stock = 4; s.credits = 10000; s.tutorial = 2;
  assert(F.start(s).ok); return s;
}
function level(s, n) { s.model.level = n; s.model.peak = Math.max(n, s.model.peak); s.best = Math.max(n, s.best); }

// Four daily model tokens, exactly one free choice, paid costs, and no duplicate rerolls.
{
  const s = F.initial(rng(0));
  assert.equal(s.stock, 4); assert.equal(F.hexCost(s), 0);
  assert.equal(s.offers.length, 3); assert.equal(new Set(s.offers).size, 3);
  assert(F.choose(s, s.offers[0], rng(.5)).ok);
  assert.equal(s.stock, 4); assert.equal(s.hexes.length, 1); assert.equal(F.hexCost(s), 1);
  const reload = F.restore(JSON.stringify(s));
  assert(reload); assert.equal(F.hexCost(reload), 1); assert.deepEqual(reload.offers, s.offers);
  rejects(s, () => F.choose(s, s.hexes[0]));
  assert(F.choose(s, s.offers[0]).ok); assert.equal(s.stock, 3); assert.equal(F.hexCost(s), 2);
  assert(F.choose(s, s.offers[0]).ok); assert.equal(s.stock, 1); assert.equal(F.hexCost(s), 3);
  rejects(s, () => F.choose(s, s.offers[0]));
  assert(F.start(s).ok); assert.equal(s.stock, 0);
  rejects(s, () => F.start(s)); rejects(s, () => F.deliver(s)); rejects(s, () => F.endDay(s, true));
  assert(F.discard(s).ok); rejects(s, () => F.start(s));
  const retained = s.hexes.slice(); s.dayRevenue = s.quota;
  assert(F.endDay(s, false, rng(0)).ok);
  assert.equal(s.day, 2); assert.equal(s.stock, 4); assert.equal(s.quota, 231);
  assert.equal(s.dayRevenue, 0); assert.equal(F.hexCost(s), 0); assert.equal(s.extraBuys, 0);
  assert.deepEqual(s.hexes, retained); assert(s.offers.every(id => !s.hexes.includes(id)));
  assert(F.restore(s));
}

// Training consumes finite stock; no passive time income, empty-model profit or hotstart farming.
{
  const s = F.initial(rng(0)); assert(F.start(s).ok);
  assert.equal(F.price(s), 0); rejects(s, () => F.deliver(s));
  assert.equal(F.train(s, rng(.999)).kind, 'success'); assert.equal(F.train(s, rng(.999)).kind, 'success');
  assert.equal(s.model.level, 2); assert.equal(s.tutorial, 2);
  const value = F.price(s); assert(F.deliver(s).value === value); assert.equal(s.dayRevenue, value);
  rejects(s, () => F.deliver(s)); assert.equal(F.restore(s).credits, s.credits);
  const t = ready(['hotstart']); assert.equal(t.model.level, 2); assert.equal(F.price(t), 0);
  rejects(t, () => F.deliver(t)); assert(F.train(t, rng(0)).kind === 'success'); assert(F.deliver(t).value > 0);
}

// Day losses are explicit; exhausting funding/stock has a controlled exit instead of a softlock.
{
  const s = F.initial(rng(0)); rejects(s, () => F.endDay(s));
  assert(F.endDay(s, true).ok); assert.equal(s.day, 2); assert.equal(s.lives, 2);
  assert(F.endDay(s, true).ok); assert.equal(s.lives, 1);
  assert(F.endDay(s, true).lost); assert.equal(s.status, 'lost'); assert.equal(s.lives, 0);
  for (const action of [() => F.start(s), () => F.choose(s, s.offers[0]), () => F.train(s), () => F.buyGpu(s), () => F.endDay(s, true)]) rejects(s, action);
  assert(F.restore(s));
  const t = F.initial(rng(0)); for (let day = 1; day <= 12; day++) { t.dayRevenue = t.quota; assert(F.endDay(t).ok); }
  assert.equal(t.day, 12); assert.equal(t.status, 'won'); assert(F.restore(t));
  rejects(t, () => F.start(t)); assert(F.continueRun(t).ok); assert.equal(t.day, 13); assert.equal(t.status, 'active'); assert.equal(t.stock, 4);
  rejects(t, () => F.continueRun(t));
}

// Stable build: checkpoint -> regression -> one-time stable guard -> milestone anchor.
{
  const s = ready(['checkpoint', 'anchor', 'clean']); level(s, 9);
  assert(F.synergies(s).find(x => x.family === 'stable').active);
  const result = F.train(s, rng(.999));
  assert.equal(result.kind, 'regress'); assert(result.protected); assert(result.stableGuarded);
  assert.equal(s.model.level, 9); assert.equal(s.model.shield, false); assert.equal(s.model.stableGuard, false);
  // Choose a regression outcome (remaining negative ranges end at index 3).
  const p = F.probabilities(s); const r = (p[0] + p[1] + p[2] / 2) / 100;
  assert.equal(F.train(s, rng(r)).kind, 'regress'); assert.equal(s.model.level, 8);
  assert.equal(F.train(s, rng(r)).kind, 'regress'); assert.equal(s.model.level, 8);
  assert.equal(F.train(s, rng(.999)).kind, 'collapse');
  assert.equal(s.model, null); assert.equal(s.hexes.length, 3, 'hexes survive a model collapse');
  // Acquiring an anchor below a previous peak must never turn regression into a level gain.
  const t = ready(['anchor']); level(t, 9); t.model.level = 6;
  const q = F.probabilities(t); F.train(t, rng((q[0] + q[1] + 1) / 100)); assert.equal(t.model.level, 6);
}

// Burst build: improved chance, extra levels, per-breakthrough valuation and family reward.
{
  const s = ready(['curriculum', 'chain', 'burstvalue']);
  const p = F.probabilities(s); assert.equal(p[1], 17);
  const res = F.train(s, rng((p[0] + .5) / 100)); assert.equal(res.kind, 'breakthrough'); assert.equal(res.delta, 3);
  assert.equal(s.model.bursts, 1); assert(F.synergies(s).find(x => x.family === 'burst').active);
  const value = F.price(s); s.hexes = ['curriculum', 'chain']; assert(value > F.price(s) * 1.45);
  const t = ready(['overclock']); assert.equal(F.probabilities(t)[3], 5); assert.equal(F.probabilities(t)[1], 22);
}

// Salvage build refunds actual spent amounts, gives one daily token, and carries failure buffs.
{
  const s = ready(['refund', 'compost', 'backup']); level(s, 16);
  const before = s.credits, cost = F.fee(s), stock = s.stock;
  const result = F.train(s, rng(.999)); assert.equal(result.kind, 'collapse');
  assert.equal(result.refund, Math.floor(cost * .75) + 40); assert.equal(s.credits, before - cost + result.refund);
  assert.equal(s.stock, stock + 1); assert.equal(s.daySalvaged, true);
  assert(F.start(s).ok); level(s, 16); assert.equal(F.train(s, rng(.999)).token, 0);
  s.dayRevenue = s.quota; assert(F.endDay(s).ok); assert.equal(s.daySalvaged, false); assert.equal(s.stock, 4);
  const t = ready(['failureboost', 'recyclevalue']); level(t, 4);
  const p = F.probabilities(t); const r = (p[0] + p[1] + 1) / 100;
  assert.equal(F.train(t, rng(r)).kind, 'regress'); assert(t.model.boost); assert.equal(t.model.regressions, 1);
  assert.equal(F.probabilities(t)[1], 27); assert(F.train(t, rng(0)).kind === 'success'); assert(!t.model.boost);
}

// Every level has a visual index; only first-time milestone crossings trigger evolution.
{
  const s = ready(); level(s, 3); const a = F.train(s, rng(0)); assert(a.evolved); assert.equal(F.evolution(s.model).index, 4);
  assert.equal(F.evolution(s.model).name, '感知核'); s.model.level = 3;
  assert(!F.train(s, rng(0)).evolved, 'crossing a previously visited boundary is not another first evolution');
  for (let n = 0; n <= 24; n++) assert.equal(F.evolution({ level: n, arch: 'mlp' }).index, n);
  assert.equal(F.evolution({ level: 20, arch: 'transformer' }).name, 'GPT-5.6 Sol');
  assert(F.evolution({ level: 24, arch: 'moe' }).special);
  assert.equal(F.evolution({ level: 24, arch: 'mlp' }).multiplier, 5);
  level(s, 24); rejects(s, () => F.train(s));
}

// Purchases require licenses, memory gates and affordability; new GPU value needs a successful step.
{
  const s = F.initial(rng(0)); rejects(s, () => F.buyGpu(s)); rejects(s, () => F.buyModel(s, 'cnn'));
  s.credits = 100000; rejects(s, () => F.buyModel(s, 'transformer'));
  assert(F.buyModel(s, 'cnn').ok); rejects(s, () => F.buyModel(s, 'cnn'));
  assert(F.start(s).ok); F.train(s, rng(0)); F.train(s, rng(0));
  const price = F.price(s); assert(F.buyGpu(s).ok); assert.equal(F.price(s), price);
  F.train(s, rng(.999)); assert.equal(s.model.gpuValue, 1);
  F.train(s, rng(0)); assert.equal(s.model.gpuValue, 1.35);
  assert(F.buyModel(s, 'transformer').ok); assert(F.restore(s));
}

// Broad modifier combinations stay non-negative, total 100, and keep all values bounded.
{
  const s = ready(); s.credits = F.MAX_VALUE;
  const decks = [[], F.HEXES.map(h => h.id), ...['stable', 'burst', 'salvage'].map(f => F.HEXES.filter(h => h.family === f).map(h => h.id))];
  for (let mask = 0; mask < 32; mask++) decks.push(F.HEXES.filter((_, i) => mask & (1 << (i % 5))).map(h => h.id));
  for (const arch of F.MODELS) for (let gpu = 0; gpu < F.GPUS.length; gpu++) for (let n = 0; n < 25; n++) for (const deck of decks) {
    s.model.arch = arch.id; s.gpu = gpu; s.model.level = n; s.hexes = deck; s.model.boost = true;
    const p = F.probabilities(s); assert.equal(p.reduce((a, b) => a + b), 100);
    assert(p.every(x => Number.isFinite(x) && x >= 0 && x <= 100)); assert(Number.isFinite(F.price(s))); assert(F.fee(s) > 0);
  }
}

// Reload preserves pending offers/free-claim status and never issues model tokens or time rewards.
{
  const s = F.initial(rng(0)); assert(F.choose(s, s.offers[0]).ok); assert(F.start(s).ok); F.train(s, rng(0));
  const restored = F.restore(JSON.stringify(s)); assert(restored); assert.deepEqual(restored, s); assert.notEqual(restored, s);
  assert.equal(F.restore('{'), null); assert.equal(F.restore({ ...s, version: 2 }), null);
  assert.equal(F.restore({ ...s, credits: -1 }), null); assert.equal(F.restore({ ...s, stock: 99 }), null);
  assert.equal(F.restore({ ...s, offers: [s.hexes[0]] }), null); assert.equal(F.restore({ ...s, gpu: 10 }), null);
  assert.equal(F.restore({ ...s, model: { ...s.model, level: 25 } }), null);
  assert.equal(F.restore({ ...s, model: { ...s.model, gpuValue: 999 } }), null);
  assert.equal(F.restore({ ...s, lives: 0 }), null);
  assert.equal(F.restore({ ...s, unlocked: ['mlp', '__proto__'] }), null);
}

// Long play retains only recent history, exact daily stock, and valid save states.
{
  const s = F.initial(rng(0)); s.credits = 1e9;
  for (let d = 1; d <= 35; d++) {
    if (s.offers.length) F.choose(s, s.offers[0], rng(0));
    while (s.stock > 0) {
      F.start(s); while (s.model.level < 8) F.train(s, rng(0)); F.deliver(s);
    }
    s.dayRevenue = s.quota; F.endDay(s, false, rng(0)); if (s.status === 'won') F.continueRun(s, rng(0));
    assert.equal(s.stock, 4); assert(s.history.length <= 20); assert(F.restore(s));
  }
  assert.equal(s.hexes.length, 30); assert.equal(s.offers.length, 0);
}

// Thirty distinct cards, ten per family. Six-card builds unlock deeper conditional mechanics.
{
  assert.equal(F.HEXES.length, 30);
  for (const family of ['stable', 'burst', 'salvage']) assert.equal(F.HEXES.filter(h => h.family === family).length, 10);
  const s = ready(['clean', 'checkpoint', 'anchor', 'efficiency', 'warmup', 'calibration']);
  const synergy = F.synergies(s).find(x => x.family === 'stable');
  assert(synergy.active && synergy.deepActive && synergy.deepDescription);
  s.model.shield = false; level(s, 3);
  assert(F.train(s, rng(0)).evolved); assert(s.model.shield, 'new evolution restores a consumed checkpoint');
  s.model.shield = false; s.model.level = 3;
  assert(!F.train(s, rng(0)).evolved); assert.equal(s.model.shield, false, 'revisiting old milestone cannot restore protection');

  const t = ready(['curriculum', 'chain', 'overclock', 'hotstart', 'burstvalue', 'threshold']);
  const outcome = () => { const p = F.probabilities(t); return F.train(t, rng((p[0] + 1) / 100)); };
  assert.equal(outcome().delta, 5); assert(t.model.firstBurstUsed);
  assert.equal(outcome().delta, 3, 'the extra +2 is first breakthrough only');

  const u = ready(['refund', 'compost', 'backup', 'failureboost', 'recyclevalue', 'insurance']);
  for (let n = 0; n < 3; n++) {
    if (!u.model) assert(F.start(u).ok);
    level(u, 16); const res = F.train(u, rng(.999));
    assert.equal(res.kind, 'collapse'); assert.equal(res.token, n < 2 ? 1 : 0);
    assert.equal(u.dayRescues, Math.min(2, n + 1));
    if (n === 0) { assert(u.dayInsuranceUsed); assert(res.refund >= 140); }
    else assert(res.refund < 140, 'high-tier insurance is once daily');
  }
  u.dayRevenue = u.quota; F.endDay(u);
  assert.equal(u.dayRescues, 0); assert.equal(u.daySalvaged, false); assert.equal(u.dayInsuranceUsed, false);
}

// Conditional fees, checkpoint deliveries, quota-only certificates and voluntary recycling.
{
  const s = ready(['warmup', 'frugal', 'efficiency']); s.credits = 100;
  assert.equal(F.fee(s), 1, 'discounts never create zero/negative-cost training');
  s.model.steps = 3; s.credits = 120; assert.equal(F.fee(s), 3);
  const t = ready(['coldexit', 'certified', 'controlled']); level(t, 8); t.model.steps = 3; t.model.spent = 30;
  const withBonus = F.price(t); t.hexes = ['certified', 'controlled']; assert.equal(withBonus - F.price(t), 40);
  t.hexes.push('coldexit'); const result = F.deliver(t);
  assert.equal(result.contribution, Math.floor(result.value * 1.2)); assert.equal(t.dayRevenue, result.contribution);
  assert(F.start(t).ok); F.train(t, rng(0)); const before = t.credits, spent = t.model.spent, stock = t.stock;
  assert.equal(F.discard(t).refund, Math.floor(spent * .25));
  assert.equal(t.credits, before + Math.floor(spent * .25)); assert.equal(t.stock, stock);
}

// Momentum resets on non-success, threshold drafting is phase-specific, first evolutions return energy.
{
  const s = ready(['momentum']); F.train(s, rng(0)); F.train(s, rng(0));
  assert.equal(s.model.streak, 2); assert.equal(F.probabilities(s)[1], 20);
  const p = F.probabilities(s); F.train(s, rng((p[0] + 1) / 100));
  assert.equal(s.model.streak, 0);
  const t = ready(['threshold', 'phase', 'auction']); level(t, 3);
  assert.equal(F.probabilities(t)[1], 18); const before = t.credits;
  const q = F.probabilities(t); const res = F.train(t, rng((q[0] + 1) / 100));
  assert(res.evolved); assert.equal(t.credits, before, 'first-crossing breakthrough returns its training cost');
  level(t, 12); t.model.bursts = 2; const withAuction = F.price(t); t.hexes = ['threshold', 'phase', 'curriculum'];
  assert.equal(withAuction - F.price(t), 120);
  const u = ready(['glass']); level(u, 8);
  assert.equal(F.probabilities(u)[3], 19); assert.equal(F.probabilities(u)[1], 28);
  const cost = F.fee(u); u.hexes = []; assert.equal(cost - F.fee(u), 3);
}

// Failure-oriented hooks refund once, convert recovery to quota, and make the next ordinary success recover +2.
{
  const s = ready(['audit', 'rebound']); const before = s.credits;
  assert.equal(F.train(s, rng(.999)).kind, 'regress'); assert.equal(s.credits, before); assert(s.model.boost);
  assert.equal(F.train(s, rng(0)).delta, 2); assert(!s.model.boost);
  const t = ready(['waste', 'compost']); level(t, 8); const result = F.train(t, rng(.999));
  assert.equal(result.refund, 40); assert.equal(t.dayRevenue, 40);
  const u = ready(['clean']); u.gpu = 4; u.model.arch = 'cnn'; level(u, 20);
  assert(F.probabilities(u)[3] >= 7, 'highest GPU and clean data cannot remove high-tier crash risk');
  for (const n of [8, 12, 16, 24]) { level(u, n); assert(F.probabilities(u)[3] >= F.riskFloor(n)); }
}

console.log('PASS: 30-card daily roguelike, one free hex, paid drafting, 3/6-card builds, all conditional effects, finite rescue tokens, daily quota/loss/win, evolutions 0–24, high-tier risk, save validation, long runs');

// Optional reproducible balance simulation, not a claim about human play or an optimized solver.
if (process.argv.includes('--simulate')) {
  const priorities = {
    stable: ['checkpoint', 'anchor', 'clean', 'efficiency', 'calibration', 'certified', 'warmup', 'coldexit', 'stablevalue', 'controlled'],
    burst: ['chain', 'hotstart', 'curriculum', 'burstvalue', 'threshold', 'phase', 'momentum', 'auction', 'overclock', 'glass'],
    salvage: ['backup', 'refund', 'compost', 'waste', 'rebound', 'failureboost', 'audit', 'insurance', 'recyclevalue', 'frugal']
  };
  function seeded(seed) { return () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; }; }
  function simulate(seed, family) {
    const random = seeded(seed), s = F.initial(random);
    const priority = [...priorities[family], ...priorities.stable, ...priorities.burst, ...priorities.salvage];
    const pick = () => { if (s.offers.length) F.choose(s, [...s.offers].sort((a, b) => priority.indexOf(a) - priority.indexOf(b))[0], random); };
    let crashes = 0, failedDays = 0, rounds = 0, deepDay = 0;
    for (let day = 1; day <= 12 && s.status === 'active'; day++) {
      pick();
      if (!deepDay && F.synergies(s).find(x => x.family === family).deepActive) deepDay = day;
      for (let attempts = 0; s.stock > 0 && attempts < 10; attempts++) {
        const arch = [...F.MODELS].reverse().find(m => s.unlocked.includes(m.id)).id;
        F.start(s, arch);
        let target = day < 3 ? 8 : day < 6 ? 10 : 12;
        if (s.dayRevenue < s.quota) target = Math.min(16, target + Math.floor(day / 5));
        for (let n = 0; s.model && s.model.level < target && n < 180; n++) {
          if (s.credits < F.fee(s)) break;
          const res = F.train(s, random); rounds++;
          if (res.kind === 'collapse') crashes++;
          if (s.model && s.dayRevenue >= s.quota && s.model.level >= 4) break;
        }
        if (s.model && F.deliver(s).error) F.discard(s);
        if (s.dayRevenue >= s.quota && s.stock >= 2 && s.offers.length && F.hexCost(s) <= s.stock - 1) pick();
      }
      if (s.dayRevenue < s.quota) failedDays++;
      const next = F.GPUS[s.gpu + 1];
      if (next && s.credits > next.cost + 300) F.buyGpu(s);
      for (const m of F.MODELS) if (!s.unlocked.includes(m.id) && s.gpu >= m.minGpu && s.credits > m.license + 300) F.buyModel(s, m.id);
      F.endDay(s, true, random);
      assert(F.restore(s), 'simulated progression must remain restorable');
    }
    return { won: s.status === 'won', day: s.day, rounds, crashes, failedDays, cards: s.hexes.length, deepDay };
  }
  for (const family of ['stable', 'burst', 'salvage']) {
    const results = Array.from({ length: 500 }, (_, i) => simulate(i + 1, family));
    const average = key => Number((results.reduce((sum, row) => sum + row[key], 0) / results.length).toFixed(3));
    console.log(JSON.stringify({ family, runs: results.length, winRate: results.filter(x => x.won).length / results.length,
      meanDay: average('day'), meanRounds: average('rounds'), meanCrashes: average('crashes'),
      meanFailedDays: average('failedDays'), meanCards: average('cards'), meanDeepDay: average('deepDay') }));
  }
}
