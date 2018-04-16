import request from '../utils/request';

export async function accountLogin(params) {
  return request('/tokens', { method: 'POST', body: { ...params } });
}

export async function sendVerifyCode(params) {
  return request('verifycodes', { method: 'POST', body: { ...params } });
}

export async function resetPassword(params) {
  return request(`passwords/${params.mobileNo}`, { method: 'PUT', body: { ...params } });
}