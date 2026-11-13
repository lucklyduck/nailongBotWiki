import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const photos = [
  {src: '/img/photos/lineup-lit.jpg', alt: '五只亮着屏幕的奶龙和看山机器人排成一排站在木架上', cap: '一排亮屏的伙伴'},
  {src: '/img/demo/pair.jpg', alt: '灰白色看山和黄色奶龙并排站在木地板上，都抱着胸前的屏幕', cap: '看山和奶龙'},
  {src: '/img/photos/model-viewer.jpg', alt: '手机上的奶龙结构观察室页面，显示黄色奶龙外壳、白色双腿和四个关节的三维模型', cap: '先在屏幕里看，再动手'},
  {src: '/img/photos/team.jpg', alt: 'catnipent 团队成员和知乎吉祥物刘看山在 2026 知乎黑客松背景板前合影', cap: '2026 知乎黑客松 · catnipent'},
  {src: '/img/photos/team-logo.jpg', alt: 'Catnipent 团队 logo：绿色叶片、粉色节点与蓝色英文标识', cap: '团队logo', contain: true},
  {src: '/img/photos/maker-journey.png', alt: '黄色奶龙 DIY 海报：从零件到桌面伙伴，配套 Wiki 图文教程，完成组装、烧录、配网和调试', cap: '开启制造之旅', contain: true},
];

const entries = [
  {title: '1. 产品介绍', to: '/docs/intro', desc: '它是什么、规格参数、部件与引脚、功能状态'},
  {title: '2. 组装', to: '/docs/assembly', desc: '备料、打印外壳、舵机归中、装腿脚和外壳'},
  {title: '3. 烧录', to: '/docs/flash', desc: '官方固件一键烧录，或编译奶龙定制固件'},
  {title: '4. 调试', to: '/docs/debug', desc: '串口日志、配网、舵机校准、唤醒与声音'},
  {title: '5. xiaozhi 后台', to: '/docs/xiaozhi', desc: '登录 xiaozhi.me、绑定设备、配置奶龙人设'},
  {title: '6. 二次开发 ★', to: '/docs/dev', desc: '加动作、加 MCP 工具、换表情、换唤醒词'},
  {title: '7. FAQ', to: '/docs/faq', desc: '常见问题与排查方法'},
  {title: '8. 下载', to: '/docs/download', desc: '固件、源码、工具、晒出你的奶龙'},
];

const communities = [
  {title: 'Datawhale 组队学习课程群', src: '/img/community/qr/datawhale-course.jpg', description: '一起学习、组装与交流', width: '100%', left: '0%', top: '0%'},
  {title: 'Catnipent 开源项目交流群', src: '/img/community/qr/catnipent-group.jpg', description: '交流开源项目与 AI + X 创意', note: '此群码有效至 11 月 20 日，过期可联系 kyle。', width: '143.31%', left: '-21.58%', top: '-66.19%'},
  {title: '课程设计者 kyle 的微信', src: '/img/community/qr/kyle-wechat.jpg', description: '欢迎来打扰', width: '142.51%', left: '-21.34%', top: '-61.27%'},
];

export default function Home() {
  return (
    <Layout title="首页" description="奶龙机器人 Wiki">
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroText}>
            <h1>奶龙机器人</h1>
            <p>
              基于小智 AI Otto 双足机器人的桌面伙伴：ESP32-S3、四个舵机、一块圆屏，
              接上 xiaozhi.me 就能听你说话、回你话、走两步、大笑一声。
              知造 ZhiForge 在 2026 知乎黑客松上的作品。谁不想急头白脸地做一个奶龙呢？
            </p>
            <div className={styles.buttons}>
              <Link className="button button--primary button--lg" to="/docs/intro/path">
                学习路线
              </Link>
              <Link className="button button--secondary button--lg" to="/docs/all-docs">
                全部文档
              </Link>
            </div>
          </div>
          <img
            className={styles.heroImg}
            src={useBaseUrl('/img/photos/hero-three-robots.jpg')}
            alt="三只奶龙机器人站在木地板上：左边一只黄色奶龙，右边两只灰白色看山，都是白色腿、蓝色脚，胸口抱着一块小屏幕"
          />
        </div>
      </header>
      <section className={styles.community} aria-labelledby="community-title">
        <div className="container">
          <h2 id="community-title">项目相关交流群</h2>
          <div className={styles.communityGrid}>
            {communities.map((group) => (
              <article className={styles.communityCard} key={group.src}>
                <h3>{group.title}</h3>
                <p>{group.description}</p>
                <a
                  className={styles.qrWindow}
                  href={useBaseUrl(group.src)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`查看${group.title}二维码原图`}
                  style={{'--qr-width': group.width, '--qr-left': group.left, '--qr-top': group.top}}
                >
                  <img src={useBaseUrl(group.src)} alt={`${group.title}二维码`} loading="lazy" />
                </a>
                <span className={styles.qrHint}>微信扫码 · 点击查看原图</span>
                {group.note && <small className={styles.qrNote}>{group.note}</small>}
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className={styles.slogan}>
        <div className="container">
          <h2>一句话 + 一根数据线，把心痒变成实物</h2>
          <p>
            在知乎刷到一个好玩的硬件，心动却迟迟没有第一步？这份 wiki 把奶龙从零件到会说话的每一步都写下来了：
            怎么装、怎么烧、怎么调、怎么让它有自己的性格，以及怎么改成你自己的伙伴。
          </p>
        </div>
      </section>
      <main className="container margin-vert--lg">
        <div className={styles.photos}>
          {photos.map((p) => (
            <figure key={p.src} className={styles.photo}>
              <img className={p.contain ? styles.photoContain : undefined} src={useBaseUrl(p.src)} alt={p.alt} loading="lazy" />
              <figcaption>{p.cap}</figcaption>
            </figure>
          ))}
        </div>
        <h2 className={styles.sectionTitle}>从哪里开始</h2>
        <div className={styles.grid}>
          {entries.map((e) => (
            <Link key={e.to} to={e.to} className={styles.card}>
              <h3>{e.title}</h3>
              <p>{e.desc}</p>
            </Link>
          ))}
        </div>
        <p className="margin-top--lg">
          <strong>一键购买获得完整套件：</strong>
          <a href="https://e.tb.cn/h.j8ScmrB2vTg7gFa?tk=hm5D6W4b1Ag" target="_blank" rel="noopener noreferrer">
            Nailongbot—桌面陪伴机器人教学套件
          </a>
        </p>
      </main>
    </Layout>
  );
}
