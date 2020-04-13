import React, { Component } from 'react';

import { getDMSDataByCDN } from '../utils/dms';
import { getParams } from '../utils/util';
import styled from '../utils/styled';


const Wrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  img {
    width: 100%;
  }
`;

// 访问地址示例：http://localhost:3000/dmsDemo?name=191jibao
export default class AppHome extends Component {
  state = {
    images: []
  };

  componentDidMount() {
    this.fetchDMSData();
    // SHARE_RIGHT();
  }

  fetchDMSData = async () => {
    const { name } = getParams(this.props.location.search);
    // pc使用61
    const moduleId = document.getElementById('wrapper') ? 61 : 58;
    const dmsData = await getDMSDataByCDN(`/44/${moduleId}/app/${name}/env/${process.env.RUN_ENV}`, this.props.location.search);
    if (dmsData) {
      this.setState({
        images: dmsData,
      });
    }
  };

  render() {
    const { images } = this.state;
    return (
      <Wrap>
        {
          images.map((image, key) => (
            <img src={image} key={`img-${key}`}/>
          ))
        }
      </Wrap>
    )
  }
}
