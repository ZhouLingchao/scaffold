// 使用localStorage存储cookie,使用后端判断cookie是否过期
const key = JWT_TOKEN_KEY; // eslint-disable-line
export function getToken() {
  return localStorage.getItem(key);
}

export function setToken(token) {
  return localStorage.setItem(key, token);
}
