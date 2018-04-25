import { stringify } from 'qs';
import request from '../utils/request';

export async function query(params) {
  return request(`/api/users?${stringify(params)}`);
}

export async function queryCurrent() {
  return request('/api/usernames');
}

export async function createUser(params) {
  return request('/users', { method: 'POST', body: { ...params } });
}

export async function updateUser(params) {
  return request('/users', { method: 'PUT', body: { ...params } });
}