import React, { useState, useEffect } from 'react';

import BaseButton from '../components/BaseButton';
import { getDMSDataByCDN } from '../utils/dms';
import styled from '../utils/styled';

const Wrap = styled.div`
  width: 100%;
  display: flex;
  max-height: 100vh;
  overflow: hidden;
  flex-direction: column;
  justify-content: flex-start;
  h1 {
    position: absolute;
    text-align: center;
    width: 100%;
    font-size: 32px;
    color: #232D65;
    top: 80px;
  }
  img {
    width: 100%;
  }
  .btn-wrap {
    position: absolute;
    width: 100%;
    padding: 0 40px;
    bottom: 120px;
  }
`;
export default (props) => {
  const [data, setData] = useState({
    title: '',
    images: [],
    bottomBtn: {}
  });

  useEffect(() => {
    init();
  }, []);

  const pageIndex = props.match.params.pageId;

  function handleClick() {
    const { features } = data.bottomBtn;
    if (features.alert) {
      alert('hehe');
    } else {
      location.href = features.url;
    }
  }

  async function init() {
    const dmsData = await getDMSDataByCDN(`/70/162/env/${process.env.RUN_ENV}`, props.location.search);
    setData(dmsData[pageIndex - 1]);
  }

  return (
    <Wrap>
      <h1>{data.title}</h1>
      {
        data.images.map((image, key) => (
          <img src={image} key={`img-${key}`}/>
        ))
      }
      <div className="btn-wrap">
        <BaseButton
          style={{ background: data.bottomBtn.btnColor }}
          onClick={handleClick}
        >
          测试按钮
        </BaseButton>
      </div>
    </Wrap>
  );
};
