// 在默认的 tip / info / warning / danger 之外，加一个奶龙口吻的提示框：:::nailong
import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import DefaultAdmonitionTypes from '@theme-original/Admonition/Types';

function NailongAdmonition({title, children}) {
  return (
    <div className="admonition-nailong">
      <div className="admonition-nailong__head">
        <img src={useBaseUrl('/img/logo.svg')} alt="" aria-hidden="true" />
        <span>{title || '奶龙说'}</span>
      </div>
      <div className="admonition-nailong__body">{children}</div>
    </div>
  );
}

export default {
  ...DefaultAdmonitionTypes,
  nailong: NailongAdmonition,
};
