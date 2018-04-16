import request from '../utils/request';
import { stringify } from 'qs';

export async function query(params) {
  return request(`/api/users?${stringify(params)}`, { method: 'GET' }, false);
}

export async function queryCurrent() {
  return request('/api/usernames');
}

export async function queryMenus() {
  return request('/api/menus');
}
