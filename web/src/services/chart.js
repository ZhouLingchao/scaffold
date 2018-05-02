import { stringify } from 'qs';
import request from '../utils/request';

export async function queryCharts(params) {
  return request(`charts?${stringify(params)}`);
}
