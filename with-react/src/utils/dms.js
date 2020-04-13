import axios from 'axios';
import MD5 from 'md5.js';

import { getParams } from './util';
import { dmsBaseUrl, dmsSalt } from '../../../config';

export const getDMSDataByCDN = async (dmsMark) => {
  try {
    const hashTempStr = new MD5().update('y' + dmsMark + dmsSalt).digest('hex'); // 临时数据标示hash
    const hashStr = new MD5().update('n' + dmsMark + dmsSalt).digest('hex'); // 正式数据标示hash
    const { enableReview } = getParams(location.search);
    if (parseInt(enableReview) === 1) {
      // 审核
      const response = await axios.get(`${dmsBaseUrl + hashTempStr}.json`);
      return response.data;
    }
    const response = await axios.get(`${dmsBaseUrl + hashStr}.json`);
    return response.data;
  } catch (e) {
    return false;
  }
};
