// 使用localStorage存储cookie,使用后端判断cookie是否过期
export function getToken() {
  return localStorage.getItem('yunshu-token');
}

export function setToken(token) {
  return localStorage.setItem('yunshu-token', token);
}
