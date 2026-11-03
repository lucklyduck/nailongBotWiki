// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '奶龙机器人 Wiki',
  tagline: '会说话、会走路、会大笑的小智 Otto 桌面伙伴',
  favicon: 'img/favicon.ico',

  url: 'https://catnipent.cn',
  baseUrl: '/',

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {onBrokenMarkdownLinks: 'warn'},
  },

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          showLastUpdateTime: false,
          admonitions: {keywords: ['nailong'], extendDefaults: true},
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      ({
        hashed: true,
        language: ['en', 'zh'],
        indexBlog: false,
        docsRouteBasePath: '/docs',
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {respectPrefersColorScheme: true},
      docs: {sidebar: {hideable: true, autoCollapseCategories: true}},
      tableOfContents: {minHeadingLevel: 2, maxHeadingLevel: 3},
      navbar: {
        title: '奶龙机器人',
        logo: {alt: '奶龙机器人', src: 'img/logo.svg'},
        items: [
          {to: '/', label: '首页', position: 'left', activeBaseRegex: '^/$'},
          {to: '/docs/all-docs', label: '全部文档', position: 'left'},
          {type: 'search', position: 'right'},
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '文档',
            items: [
              {label: '产品介绍', to: '/docs/intro'},
              {label: '组装', to: '/docs/assembly'},
              {label: '全部文档', to: '/docs/all-docs'},
            ],
          },
          {
            title: '资料',
            items: [
              {label: 'ottodiy.tech', href: 'https://ottodiy.tech/docs/downloads/'},
              {label: '立创开源 ottoRobot', href: 'https://oshwhub.com/txp666/ottorobot'},
              {label: 'xiaozhi.me', href: 'https://xiaozhi.me/'},
            ],
          },
          {
            title: '交流',
            items: [
              {label: 'FAQ', to: '/docs/faq'},
              {label: '更新日志', to: '/docs/download/changelog'},
            ],
          },
        ],
        copyright: `知造 ZhiForge · 2026 知乎黑客松 · 文档 © ${new Date().getFullYear()} 奶龙机器人项目`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['bash', 'python', 'c', 'cpp', 'json', 'ini', 'powershell'],
      },
    }),
};

export default config;
