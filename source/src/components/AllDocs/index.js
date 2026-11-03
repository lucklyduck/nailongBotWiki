import React from 'react';
import Link from '@docusaurus/Link';
import {useDocsSidebar} from '@docusaurus/plugin-content-docs/client';
import styles from './styles.module.css';

// 把一个侧边栏分类展开成平铺的链接列表
function flatten(items) {
  return items.flatMap((item) => {
    if (item.type === 'link') return [item];
    if (item.type === 'category') {
      const self = item.href ? [{label: item.label, href: item.href}] : [];
      return [...self, ...flatten(item.items)];
    }
    return [];
  });
}

export default function AllDocs() {
  const sidebar = useDocsSidebar();
  const groups = sidebar.items.filter((item) => item.type === 'category');
  const total = groups.reduce((n, g) => n + flatten([g]).length, 0);
  return (
    <div>
      <p>本站共 {total} 篇文档，按章节列出。也可以用右上角的搜索框直接搜。</p>
      <div className={styles.grid}>
        {groups.map((group, i) => {
          const links = flatten([group]);
          return (
            <section key={group.label} className={styles.card}>
              <h2 className={styles.title}>
                {i + 1}. {group.label} <span className={styles.count}>{links.length}</span>
              </h2>
              <ul className={styles.list}>
                {links.map((l) => (
                  <li key={l.href}>
                    <Link to={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
