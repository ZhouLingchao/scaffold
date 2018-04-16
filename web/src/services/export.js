import { stringify } from 'qs';
import request from '../utils/request';

// 通用导出方法
export async function exportTemplate(required, params) {
  if (required.method && required.method === 'POST') {
    return request(`/api/${required.url}`, { method: 'POST', body: { ...params } });
  } else {
    return request(`/api/${required.url}?${stringify(params)}`);
  }
}
