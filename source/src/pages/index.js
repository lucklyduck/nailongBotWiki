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
              <img src={useBaseUrl(p.src)} alt={p.alt} loading="lazy" />
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
      </main>
    </Layout>
  );
}
