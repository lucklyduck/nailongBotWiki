(function (root) {
  'use strict';

  const MAX_LEVEL = 24;
  const MAX_VALUE = 1e15;
  const MAX_COUNT = 1e9;
  const DAILY_STOCK = 4;
  const GPUS = [
    { id: '2080', name: 'RTX 2080', vram: '8 GB', bonus: 0, value: 1, cost: 0 },
    { id: '3090', name: 'RTX 3090', vram: '24 GB', bonus: 4, value: 1.35, cost: 700 },
    { id: '4090', name: 'RTX 4090', vram: '24 GB', bonus: 8, value: 1.8, cost: 2600 },
    { id: 'a100', name: 'A100', vram: '80 GB', bonus: 12, value: 2.6, cost: 9000 },
    { id: 'h100', name: 'H100 SXM', vram: '80 GB', bonus: 17, value: 3.8, cost: 28000 }
  ];
  const MODELS = [
    { id: 'mlp', name: 'MLP-1M「小白」', tag: '普通基模', description: '低成本起步，适合积累经费与组建构筑。', base: 40, license: 0, fee: 4, minGpu: 0 },
    { id: 'cnn', name: 'CNN-8M「棱镜」', tag: '稳定训练', description: '崩溃最多 −3 个百分点，转为收敛。', base: 110, license: 450, fee: 8, minGpu: 0 },
    { id: 'transformer', name: 'Transformer「灵光」', tag: '突破进化', description: '突破 +4 个百分点；Lv.20 可进化为 Sol。', base: 300, license: 1600, fee: 16, minGpu: 1 },
    { id: 'moe', name: 'MoE「专家群」', tag: '高阶涌现', description: '突破基础 +3 级；Lv.20 可进化为 Sol。', base: 850, license: 6000, fee: 30, minGpu: 2 }
  ];
  const HEXES = [
    { id: 'clean', name: '纯净语料', family: 'stable', rarity: 'rare', description: '收敛最多 +5 个百分点，优先从崩溃和回退中转入。', icon: '◇' },
    { id: 'checkpoint', name: '检查点守卫', family: 'stable', rarity: 'epic', description: '每个模型首次崩溃转为回退，保存训练成果。', icon: '⊞' },
    { id: 'anchor', name: '认知锚点', family: 'stable', rarity: 'legendary', description: '回退不低于已到达的每 4 级进化节点。', icon: '⌖' },
    { id: 'efficiency', name: '蒸馏协议', family: 'stable', rarity: 'rare', description: '每轮训练费用降低 25%，向上取整。', icon: '⌁' },
    { id: 'stablevalue', name: '可靠性认证', family: 'stable', rarity: 'epic', description: '面板崩溃概率低于 5% 时，模型估值 ×1.3。', icon: '◈' },
    { id: 'curriculum', name: '课程跃迁', family: 'burst', rarity: 'rare', description: '将 5 个百分点的收敛概率转为突破。', icon: '↗' },
    { id: 'chain', name: '思维链连锁', family: 'burst', rarity: 'legendary', description: '每次突破额外提升 1 级，更快抵达进化节点。', icon: '⛓' },
    { id: 'overclock', name: '危险超频', family: 'burst', rarity: 'epic', description: '突破 +10 个百分点，基础崩溃 +5 个百分点。', icon: 'ϟ' },
    { id: 'hotstart', name: '预训练火种', family: 'burst', rarity: 'rare', description: '新模型从 Lv.2 开始；至少训练一次才能交付。', icon: '✧' },
    { id: 'burstvalue', name: '涌现溢价', family: 'burst', rarity: 'epic', description: '本模型每次突破，累积 +15% 基础估值。', icon: '✷' },
    { id: 'refund', name: '权重回收', family: 'salvage', rarity: 'epic', description: '崩溃返还该模型累计训练开销的 50%。', icon: '↺' },
    { id: 'compost', name: '失败也是数据', family: 'salvage', rarity: 'rare', description: '每次模型崩溃，获得 40 CR 研究补助。', icon: '▦' },
    { id: 'backup', name: '冷备份仓', family: 'salvage', rarity: 'legendary', description: '每天首次模型崩溃返还 1 个基模。', icon: '▣' },
    { id: 'failureboost', name: '逆向传播', family: 'salvage', rarity: 'epic', description: '回退后，下一轮突破概率 +15 个百分点。', icon: '⇄' },
    { id: 'recyclevalue', name: '经验复利', family: 'salvage', rarity: 'rare', description: '本模型每次回退，累积 +10% 基础估值。', icon: '∞' },
    { id: 'warmup', name: '低温预热', family: 'stable', rarity: 'rare', description: '每个模型前 3 次训练费用 −2 CR，最低为 1。', icon: '◔' },
    { id: 'calibration', name: '定期校准', family: 'stable', rarity: 'epic', description: '每第 3 次训练，将最多 4 个百分点的回退概率转为收敛。', icon: '⊙' },
    { id: 'coldexit', name: '节点封装', family: 'stable', rarity: 'rare', description: '在 Lv.4 / 8 / 12 / 16 / 20 / 24 交付，额外获得 40 CR。', icon: '⬡' },
    { id: 'certified', name: '验收凭证', family: 'stable', rarity: 'legendary', description: '从未回退且 Lv.6 以上的模型，交付目标贡献 +20%，不增加经费。', icon: '✓' },
    { id: 'controlled', name: '安全下线', family: 'stable', rarity: 'epic', description: '主动弃置已训练的模型，返还其训练开销的 25%，不返基模。', icon: '⏚' },
    { id: 'momentum', name: '连续激活', family: 'burst', rarity: 'rare', description: '连续普通收敛 2 次后，下一轮突破最多 +8 个百分点；突破或回退重置连段。', icon: '»' },
    { id: 'threshold', name: '相变采样', family: 'burst', rarity: 'epic', description: '在 Lv.3 / 7 / 11 / 15 / 19 / 23，突破最多 +6 个百分点。', icon: '⟡' },
    { id: 'phase', name: '进化回能', family: 'burst', rarity: 'epic', description: '突破首次跨越进化节点时，返还本轮训练费用。', icon: '⚡' },
    { id: 'auction', name: '星火拍卖', family: 'burst', rarity: 'rare', description: 'Lv.12 以上且至少突破 2 次的模型，交付额外获得 120 CR。', icon: '✹' },
    { id: 'glass', name: '玻璃大炮', family: 'burst', rarity: 'legendary', description: 'Lv.8 以上突破最多 +12 个百分点，基础崩溃 +5 个百分点，训练费 +3 CR。', icon: '⌬' },
    { id: 'audit', name: '梯度审计', family: 'salvage', rarity: 'rare', description: '每个模型首次回退时，返还本次训练费用。', icon: '⌕' },
    { id: 'waste', name: '回收验收', family: 'salvage', rarity: 'epic', description: '崩溃回收的经费和研究补助，也计入当日交付目标。', icon: '⤴' },
    { id: 'frugal', name: '极限预算', family: 'salvage', rarity: 'rare', description: '现有经费不足 120 CR 时，训练费用 −2 CR，最低为 1。', icon: '¢' },
    { id: 'rebound', name: '韧性修复', family: 'salvage', rarity: 'epic', description: '回退后紧接的一次普通收敛，额外提升 1 级；其他结果消耗这次机会。', icon: '↯' },
    { id: 'insurance', name: '高阶保险', family: 'salvage', rarity: 'legendary', description: '每天首个 Lv.8 以上模型崩溃时，额外获得 100 CR。', icon: '⛨' }
  ];
  for (const list of [GPUS, MODELS, HEXES]) { list.forEach(Object.freeze); Object.freeze(list); }
  const byModel = id => MODELS.find(item => item.id === id);
  const byHex = id => HEXES.find(item => item.id === id);
  const has = (s, id) => s.hexes.includes(id);
  const error = message => ({ error: message });
  const bounded = value => Math.max(0, Math.min(MAX_VALUE, value));
  const increment = value => Math.min(MAX_COUNT, value + 1);
  const active = s => s.status === 'active';
  const quotaFor = day => Math.min(MAX_VALUE, Math.round(140 * Math.pow(1.65, Math.min(day - 1, 90))));
  function draw(rng = Math.random) {
    let n; try { n = rng(); } catch (_) { n = .5; }
    return Number.isFinite(n) ? Math.max(0, Math.min(1 - Number.EPSILON, n)) : .5;
  }
  function offers(s, rng) {
    const pool = HEXES.map(h => h.id).filter(id => !has(s, id));
    const next = [];
    while (pool.length && next.length < 3) next.push(pool.splice(Math.floor(draw(rng) * pool.length), 1)[0]);
    s.offers = next;
  }
  function record(s, type, message) {
    s.history.push({ type, message, day: s.day });
    if (s.history.length > 20) s.history.splice(0, s.history.length - 20);
  }
  function initial(rng = Math.random) {
    const s = {
      version: 3, day: 1, stock: DAILY_STOCK, credits: 150, gpu: 0, unlocked: ['mlp'],
      model: null, hexes: [], offers: [], freeClaimed: false, extraBuys: 0,
      quota: quotaFor(1), dayRevenue: 0, delivered: 0, best: 0, total: 0,
      tutorial: 0, lives: 3, status: 'active', history: [], evolutions: [], daySalvaged: false,
      dayRescues: 0, dayInsuranceUsed: false
    };
    offers(s, rng);
    return s;
  }
  function synergies(s) {
    const descriptions = {
      stable: '每个模型首次回退不掉级，可与检查点联动。',
      burst: '发生过突破的模型估值额外 ×1.3。',
      salvage: '崩溃额外返还该模型训练开销的 25%。'
    };
    const deepDescriptions = {
      stable: '每个模型首次跨越新的 4 级进化节点后，恢复检查点保护（需检查点守卫）。',
      burst: '每个模型第一次突破额外提升 2 级。',
      salvage: '冷备份仓每天最多返还 2 次基模（需冷备份仓）。'
    };
    return ['stable', 'burst', 'salvage'].map(family => {
      const count = s.hexes.filter(id => byHex(id).family === family).length;
      return { family, count, active: count >= 3, description: descriptions[family], deepActive: count >= 6, deepDescription: deepDescriptions[family] };
    });
  }
  const familyActive = (s, family) => synergies(s).find(item => item.family === family).active;
  const deepActive = (s, family) => synergies(s).find(item => item.family === family).deepActive;
  function evolution(model) {
    const level = model && Number.isFinite(model.level) ? Math.max(0, Math.min(MAX_LEVEL, Math.floor(model.level))) : 0;
    const tier = level === 24 ? 6 : Math.floor(level / 4);
    const names = ['胚种', '感知核', '推理体', '认知矩阵', '星环智能', '奇点核心', '太阳神'];
    const special = !!model && ['transformer', 'moe'].includes(model.arch) && level >= 20;
    return {
      tier, index: level,
      name: special ? (level === 24 ? 'GPT-5.6 Sol · 日冕' : 'GPT-5.6 Sol') : names[tier],
      rarity: ['common', 'rare', 'rare', 'epic', 'epic', 'legendary', 'mythic'][tier],
      multiplier: [1, 1.15, 1.4, 1.8, 2.4, 3.2, 5][tier], special
    };
  }
  function discover(s, level) {
    for (let n = 0; n <= level; n++) if (!s.evolutions.includes(n)) s.evolutions.push(n);
    s.evolutions.sort((a, b) => a - b);
  }
  function hexCost(s) { return s.freeClaimed ? s.extraBuys + 1 : 0; }
  function choose(s, id, rng = Math.random) {
    if (!active(s)) return error('本轮已经结束，请选择继续挑战或重新开始。');
    if (!s.offers.includes(id) || has(s, id)) return error('请选择当前提供的海克斯。');
    const cost = hexCost(s);
    if (s.stock < cost) return error('基模不足，这次增益需要 ' + cost + ' 个基模。');
    s.stock -= cost;
    if (!s.freeClaimed) s.freeClaimed = true;
    else s.extraBuys++;
    s.hexes.push(id);
    offers(s, rng);
    record(s, 'hex', '获得「' + byHex(id).name + '」：' + (cost ? '消耗 ' + cost + ' 个基模。' : '今日免费选择。'));
    return { ok: true, cost, id };
  }
  function start(s, arch = 'mlp') {
    if (!active(s)) return error('本轮已经结束。');
    if (s.model) return error('请先交付或弃置当前模型。');
    const a = byModel(arch);
    if (!a || !s.unlocked.includes(arch)) return error('先购买这个架构的永久许可。');
    if (s.gpu < a.minGpu) return error('当前显卡未达到架构要求。');
    if (s.stock < 1) return error('今日基模已用完，请结算这一天。');
    const level = has(s, 'hotstart') ? 2 : 0;
    s.stock--;
    s.model = { arch, level, peak: level, steps: 0, shield: true, gpuValue: 1,
      bursts: 0, spent: 0, regressions: 0, boost: false, stableGuard: true,
      firstBurstUsed: false, streak: 0 };
    s.best = Math.max(s.best, level);
    discover(s, level);
    record(s, 'start', '消耗 1 个基模，初始化 ' + a.name + ' Lv.' + level + '。');
    return { ok: true };
  }
  function fee(s) {
    if (!s.model) return 0;
    const m = s.model;
    let cost = Math.ceil((byModel(m.arch).fee + m.level * 1.5) * (has(s, 'efficiency') ? .75 : 1));
    if (has(s, 'glass') && m.level >= 8) cost += 3;
    if (has(s, 'warmup') && m.steps < 3) cost -= 2;
    if (has(s, 'frugal') && s.credits < 120) cost -= 2;
    return Math.max(1, cost);
  }
  function transfer(p, from, to, amount) {
    const n = Math.min(p[from], amount); p[from] -= n; p[to] += n; return n;
  }
  function riskFloor(level) { return level >= 16 ? 7 : level >= 12 ? 4 : level >= 8 ? 2 : 0; }
  function safer(p, amount, floor = 0) {
    const n = transfer(p, 3, 0, Math.min(amount, Math.max(0, p[3] - floor)));
    transfer(p, 2, 0, amount - n);
  }
  function probabilities(s) {
    if (!s.model) return [0, 0, 0, 0];
    if (s.tutorial < 2) return [100, 0, 0, 0];
    const level = s.model.level;
    const floor = riskFloor(level);
    const p = level < 4 ? [82, 12, 6, 0] : level < 8 ? [65, 15, 16, 4]
      : level < 12 ? [48, 16, 22, 14] : level < 16 ? [35, 17, 25, 23] : [25, 18, 27, 30];
    if (has(s, 'overclock')) transfer(p, 0, 3, 5);
    if (has(s, 'glass') && level >= 8) transfer(p, 0, 3, 5);
    if (s.model.arch === 'cnn') transfer(p, 3, 0, Math.min(3, Math.max(0, p[3] - floor)));
    safer(p, GPUS[s.gpu].bonus, floor);
    if (has(s, 'clean')) safer(p, 5, floor);
    if (has(s, 'calibration') && (s.model.steps + 1) % 3 === 0) transfer(p, 2, 0, 4);
    if (s.model.arch === 'transformer') transfer(p, 0, 1, 4);
    if (has(s, 'curriculum')) transfer(p, 0, 1, 5);
    if (has(s, 'overclock')) transfer(p, 0, 1, 10);
    if (has(s, 'glass') && level >= 8) transfer(p, 0, 1, 12);
    if (has(s, 'threshold') && level % 4 === 3) transfer(p, 0, 1, 6);
    if (has(s, 'momentum') && s.model.streak >= 2) transfer(p, 0, 1, 8);
    if (has(s, 'failureboost') && s.model.boost) transfer(p, 0, 1, 15);
    return p;
  }
  function price(s) {
    const m = s.model;
    if (!m || m.level < 1 || m.steps < 1) return 0;
    let value = byModel(m.arch).base * Math.pow(1.32, m.level) * m.gpuValue * evolution(m).multiplier;
    if (has(s, 'stablevalue') && probabilities(s)[3] < 5) value *= 1.3;
    if (has(s, 'burstvalue')) value *= 1 + m.bursts * .15;
    if (has(s, 'recyclevalue')) value *= 1 + m.regressions * .10;
    if (familyActive(s, 'burst') && m.bursts > 0) value *= 1.3;
    if (has(s, 'coldexit') && m.level > 0 && m.level % 4 === 0) value += 40;
    if (has(s, 'auction') && m.level >= 12 && m.bursts >= 2) value += 120;
    return Math.floor(bounded(value));
  }
  function train(s, rng = Math.random) {
    if (!active(s)) return error('本轮已经结束。');
    if (!s.model) return error('先消耗 1 个基模初始化模型。');
    const m = s.model;
    if (m.level >= MAX_LEVEL) return error('已达到最高进化等级，可以交付。');
    const cost = fee(s);
    if (s.credits < cost) return error('经费不足，请交付已有模型；无法交付时可弃置并结算当天。');
    let r = draw(rng) * 100, outcome = 0;
    const p = probabilities(s);
    while (outcome < 3 && r >= p[outcome]) { r -= p[outcome]; outcome++; }
    s.credits = bounded(s.credits - cost);
    s.total = increment(s.total);
    s.tutorial = Math.min(2, s.tutorial + 1);
    const hadBoost = m.boost;
    m.steps = increment(m.steps); m.spent = bounded(m.spent + cost); m.boost = false;
    const before = m.level, oldPeak = m.peak;
    let protectedByCheckpoint = false, stableGuarded = false;
    if (outcome === 3 && has(s, 'checkpoint') && m.shield) {
      m.shield = false; outcome = 2; protectedByCheckpoint = true;
    }
    if (outcome === 3) {
      const fraction = (has(s, 'refund') ? .5 : 0) + (familyActive(s, 'salvage') ? .25 : 0);
      const insured = has(s, 'insurance') && before >= 8 && !s.dayInsuranceUsed;
      const refund = Math.floor(m.spent * fraction) + (has(s, 'compost') ? 40 : 0) + (insured ? 100 : 0);
      if (insured) s.dayInsuranceUsed = true;
      s.credits = bounded(s.credits + refund);
      if (has(s, 'waste')) s.dayRevenue = bounded(s.dayRevenue + refund);
      const token = has(s, 'backup') && s.dayRescues < (deepActive(s, 'salvage') ? 2 : 1) ? 1 : 0;
      if (token) { s.stock++; s.dayRescues++; s.daySalvaged = true; }
      s.model = null;
      const message = '模型崩溃。' + (refund ? ' 回收 ' + refund + ' CR。' : '') + (token ? ' 冷备份返还 1 个基模。' : '');
      record(s, 'collapse', message);
      return { kind: 'collapse', delta: -before, message, refund, token, evolved: false };
    }
    if (outcome === 0) {
      m.level = Math.min(MAX_LEVEL, before + 1 + (has(s, 'rebound') && hadBoost ? 1 : 0));
      m.streak = increment(m.streak);
    } else m.streak = 0;
    if (outcome === 1) {
      m.level = Math.min(MAX_LEVEL, before + (m.arch === 'moe' ? 3 : 2) + (has(s, 'chain') ? 1 : 0)
        + (deepActive(s, 'burst') && !m.firstBurstUsed ? 2 : 0));
      m.firstBurstUsed = true;
      m.bursts = increment(m.bursts);
    }
    if (outcome === 2) {
      m.regressions = increment(m.regressions);
      m.level = Math.max(0, before - 1);
      if (has(s, 'anchor')) m.level = Math.max(m.level, Math.min(before, Math.floor(m.peak / 4) * 4));
      if (familyActive(s, 'stable') && m.stableGuard) {
        m.stableGuard = false; m.level = before; stableGuarded = true;
      }
      if (has(s, 'failureboost') || has(s, 'rebound')) m.boost = true;
      if (has(s, 'audit') && m.regressions === 1) s.credits = bounded(s.credits + cost);
    }
    if (outcome < 2) m.gpuValue = Math.max(m.gpuValue, GPUS[s.gpu].value);
    m.peak = Math.max(oldPeak, m.level); s.best = Math.max(s.best, m.level); discover(s, m.level);
    const evolved = [4, 8, 12, 16, 20, 24].some(level => oldPeak < level && m.level >= level);
    if (evolved && deepActive(s, 'stable') && has(s, 'checkpoint')) m.shield = true;
    if (evolved && outcome === 1 && has(s, 'phase')) s.credits = bounded(s.credits + cost);
    const kind = ['success', 'breakthrough', 'regress'][outcome];
    let message = outcome === 0 ? '训练收敛，等级 +' + (m.level - before) + '。' : outcome === 1 ? '涌现突破，等级 +' + (m.level - before) + '！'
      : protectedByCheckpoint ? '检查点救回权重，崩溃转为回退。' : '本轮训练回退。';
    if (stableGuarded) message += ' 稳态构筑抵消本次掉级。';
    else if (outcome === 2 && m.level === before) message += ' 认知锚点守住当前进化节点。';
    if (evolved) message += ' 进化为「' + evolution(m).name + '」！';
    record(s, evolved ? 'evolution' : kind, message);
    return { kind, delta: m.level - before, message, evolved, protected: protectedByCheckpoint, stableGuarded };
  }
  function deliver(s) {
    if (!active(s)) return error('本轮已经结束。');
    if (!s.model) return error('没有可以交付的模型。');
    if (s.model.steps < 1 || s.model.level < 1) return error('模型至少完成一次训练且达到 Lv.1 才能交付。');
    const value = price(s), name = evolution(s.model).name, level = s.model.level;
    const contribution = has(s, 'certified') && level >= 6 && s.model.regressions === 0 ? Math.floor(bounded(value * 1.2)) : value;
    s.credits = bounded(s.credits + value); s.dayRevenue = bounded(s.dayRevenue + contribution); s.delivered = increment(s.delivered);
    s.model = null;
    record(s, 'deliver', '交付「' + name + '」Lv.' + level + '，获得 ' + value + ' CR。' + (contribution > value ? ' 目标贡献 ' + contribution + ' CR。' : ''));
    return { value, contribution };
  }
  function discard(s) {
    if (!active(s)) return error('本轮已经结束。');
    if (!s.model) return error('没有需要弃置的模型。');
    const refund = has(s, 'controlled') && s.model.steps > 0 ? Math.floor(s.model.spent * .25) : 0;
    s.credits = bounded(s.credits + refund); s.model = null;
    record(s, 'discard', '当前模型已弃置，不返还基模。' + (refund ? ' 安全下线返还 ' + refund + ' CR。' : ''));
    return { ok: true, refund };
  }
  function buyGpu(s) {
    if (!active(s)) return error('本轮已经结束。');
    const next = GPUS[s.gpu + 1];
    if (!next) return error('已达到最高显卡配置。');
    if (s.credits < next.cost) return error('研究经费不足。');
    s.credits -= next.cost; s.gpu++;
    record(s, 'gpu', '显卡升级为 ' + next.name + '。');
    return { ok: true, gpu: s.gpu };
  }
  function buyModel(s, id) {
    if (!active(s)) return error('本轮已经结束。');
    const model = byModel(id);
    if (!model) return error('没有这个模型架构。');
    if (s.unlocked.includes(id)) return error('已持有这个架构的许可。');
    if (s.gpu < model.minGpu) return error('需要 ' + GPUS[model.minGpu].name + ' 或更高显卡。');
    if (s.credits < model.license) return error('研究经费不足。');
    s.credits -= model.license; s.unlocked.push(id);
    record(s, 'purchase', '购买 ' + model.name + ' 架构许可。');
    return { ok: true, id };
  }
  function nextDay(s, rng) {
    s.day++; s.quota = quotaFor(s.day); s.stock = DAILY_STOCK;
    s.dayRevenue = 0; s.freeClaimed = false; s.extraBuys = 0; s.daySalvaged = false; s.dayRescues = 0; s.dayInsuranceUsed = false;
    offers(s, rng);
    record(s, 'day', '第 ' + s.day + ' 天开始，配发 4 个基模与 1 次免费海克斯选择。');
  }
  function endDay(s, force = false, rng = Math.random) {
    if (!active(s)) return error('本轮已结束。');
    if (s.model) return error('请先交付或弃置训练中的模型。');
    const met = s.dayRevenue >= s.quota;
    if (!met && !force) return error('今日交付目标尚未完成。强行结算将失去 1 点稳定度。');
    if (!met) {
      s.lives--;
      record(s, 'penalty', '未完成今日目标，稳定度 −1。');
      if (s.lives === 0) { s.status = 'lost'; record(s, 'lost', '实验室稳定度归零，本轮挑战结束。'); return { ok: true, lost: true }; }
    }
    if (s.day === 12) {
      s.status = 'won';
      record(s, 'won', '完成十二天研究挑战，可以继续无尽实验。');
      return { ok: true, won: true, met };
    }
    nextDay(s, rng);
    return { ok: true, met, day: s.day };
  }
  function continueRun(s, rng = Math.random) {
    if (s.status !== 'won' || s.day !== 12) return error('目前不能进入无尽挑战。');
    s.status = 'active'; nextDay(s, rng);
    return { ok: true, day: s.day };
  }
  function restore(raw) {
    let s; try { s = typeof raw === 'string' ? JSON.parse(raw) : JSON.parse(JSON.stringify(raw)); } catch (_) { return null; }
    const int = (n, max = MAX_COUNT) => Number.isSafeInteger(n) && n >= 0 && n <= max;
    const amount = n => Number.isFinite(n) && n >= 0 && n <= MAX_VALUE;
    const ids = (list, allowed, max) => Array.isArray(list) && list.length <= max && new Set(list).size === list.length && list.every(id => allowed.includes(id));
    if (!s || s.version !== 3 || !int(s.day) || s.day < 1 || !int(s.stock, DAILY_STOCK + 2)
      || !amount(s.credits) || !int(s.gpu, GPUS.length - 1) || !amount(s.dayRevenue)
      || !int(s.delivered) || !int(s.best, MAX_LEVEL) || !int(s.total) || !int(s.tutorial, 2)
      || !int(s.lives, 3) || !['active', 'won', 'lost'].includes(s.status)
      || typeof s.freeClaimed !== 'boolean' || !int(s.extraBuys, HEXES.length)
      || typeof s.daySalvaged !== 'boolean' || !int(s.dayRescues, 2) || typeof s.dayInsuranceUsed !== 'boolean'
      || s.daySalvaged !== (s.dayRescues > 0) || s.quota !== quotaFor(s.day)) return null;
    if (s.status === 'lost' ? s.lives !== 0 : s.lives < 1) return null;
    if (s.status === 'won' && s.day !== 12) return null;
    if (!s.freeClaimed && s.extraBuys !== 0) return null;
    if (s.stock > DAILY_STOCK + s.dayRescues) return null;
    if (!ids(s.unlocked, MODELS.map(m => m.id), MODELS.length) || !s.unlocked.includes('mlp')
      || s.unlocked.some(id => byModel(id).minGpu > s.gpu)
      || !ids(s.hexes, HEXES.map(h => h.id), HEXES.length)
      || !ids(s.offers, HEXES.map(h => h.id), 3) || s.offers.some(id => has(s, id))
      || s.offers.length !== Math.min(3, HEXES.length - s.hexes.length)
      || !ids(s.evolutions, Array.from({ length: 25 }, (_, i) => i), 25)
      || s.evolutions.some(n => n > s.best)) return null;
    if (s.freeClaimed && s.hexes.length < 1 + s.extraBuys) return null;
    if (s.daySalvaged && !has(s, 'backup')) return null;
    if (s.dayRescues > 1 && !deepActive(s, 'salvage')) return null;
    if (s.dayInsuranceUsed && !has(s, 'insurance')) return null;
    if (s.model !== null) {
      const m = s.model;
      if (!m || !active(s) || !s.unlocked.includes(m.arch) || !int(m.level, MAX_LEVEL) || !int(m.peak, MAX_LEVEL)
        || m.peak < m.level || s.best < m.peak || !int(m.steps) || !int(m.bursts) || !int(m.regressions)
        || m.bursts + m.regressions > m.steps || m.steps > s.total || !amount(m.spent)
        || typeof m.shield !== 'boolean' || typeof m.boost !== 'boolean' || typeof m.stableGuard !== 'boolean'
        || typeof m.firstBurstUsed !== 'boolean' || !int(m.streak) || m.streak > m.steps
        || m.firstBurstUsed !== (m.bursts > 0)
        || !GPUS.some(g => g.value === m.gpuValue) || m.gpuValue > GPUS[s.gpu].value
        || !s.evolutions.includes(m.level) || (m.boost && !has(s, 'failureboost') && !has(s, 'rebound'))
        || (m.steps === 0 && (m.level > 2 || m.spent !== 0 || m.bursts !== 0 || m.regressions !== 0))) return null;
    }
    const eventTypes = ['hex', 'start', 'success', 'breakthrough', 'regress', 'collapse', 'evolution', 'deliver', 'discard', 'gpu', 'purchase', 'day', 'penalty', 'lost', 'won'];
    if (!Array.isArray(s.history) || s.history.length > 20 || s.history.some(h => !h || !eventTypes.includes(h.type)
      || typeof h.message !== 'string' || h.message.length > 400 || !int(h.day) || h.day < 1 || h.day > s.day)) return null;
    // Copy whitelisted fields only. Reload does not draw new cards, issue stock or income.
    const clean = {};
    for (const key of ['version', 'day', 'stock', 'credits', 'gpu', 'unlocked', 'model', 'hexes', 'offers', 'freeClaimed', 'extraBuys', 'quota', 'dayRevenue', 'delivered', 'best', 'total', 'tutorial', 'lives', 'status', 'history', 'evolutions', 'daySalvaged', 'dayRescues', 'dayInsuranceUsed']) clean[key] = s[key];
    if (s.model) {
      clean.model = {};
      for (const key of ['arch', 'level', 'peak', 'steps', 'shield', 'gpuValue', 'bursts', 'spent', 'regressions', 'boost', 'stableGuard', 'firstBurstUsed', 'streak']) clean.model[key] = s.model[key];
    }
    clean.history = s.history.map(({ type, message, day }) => ({ type, message, day }));
    return clean;
  }
  const api = { GPUS, MODELS, HEXES, initial, start, choose, hexCost, train, fee, price, probabilities,
    deliver, buyGpu, buyModel, endDay, continueRun, discard, restore, evolution, synergies,
    MAX_LEVEL, MAX_VALUE, DAILY_STOCK, riskFloor };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.RogueLab = api;
})(typeof window !== 'undefined' ? window : globalThis);
