import { stringify } from 'qs';
import request from '../utils/request';

export async function queryUsers(params) {
  return request(`/users?${stringify(params)}`);
}

export async function createUser(params) {
  return request('/users', { method: 'POST', body: { ...params } });
}

export async function updateUser(params) {
  return request('/users', { method: 'PUT', body: { ...params } });
}

export async function queryRoles(params) {
  return request(`/roles?${stringify(params)}`);
}

export async function createRole(params) {
  return request('/roles', { method: 'POST', body: { ...params } });
}

export async function updateRole(params) {
  return request('/roles', { method: 'PUT', body: { ...params } });
}

export async function queryAuths(params) {
  return request(`/roleFunctions?${stringify(params)}`);
}
