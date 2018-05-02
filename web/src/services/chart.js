import { stringify } from 'qs';
import request from '../utils/request';

export async function queryChart(params) {
  return request(`charts?${stringify(params)}`);
}
