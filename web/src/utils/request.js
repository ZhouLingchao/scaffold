import fetch from 'dva/fetch';
import { notification } from 'antd';
import { routerRedux } from 'dva/router';
import store from '../index';
import { getToken } from '../utils/token';
import getRightApiUrl from '../utils/url';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errortext = codeMessage[response.status] || response.statusText;
  processError(response, `请求错误 ${response.status}: ${response.url}`, errortext);
}

function processError(response, message, errortext) {
  if (message) {
    notification.error({
      message,
      description: errortext,
    });
  }
  const error = new Error(errortext);
  error.name = response.status;
  error.response = response;
  throw error;
}
function getRealUrl(url) { // eslint-disable-line
  // 是否禁用代理
  const noProxy = process.env.NO_PROXY === 'true';
  const wrapApiUrl = getRightApiUrl(url);
  return noProxy ? APIURL + wrapApiUrl : wrapApiUrl;  // eslint-disable-line
}
/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  const token = getToken();
  const defaultOptions = {
    credentials: 'include',
    headers: token ? {
      Authorization: `Bearer ${token}`,
    } : {},
  };
  const newOptions = { ...defaultOptions, ...options };
  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
    newOptions.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      ...newOptions.headers,
    };
    newOptions.body = JSON.stringify(newOptions.body);
  }
  return fetch(getRealUrl(url), newOptions) // eslint-disable-line
    .then(checkStatus)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      const { code, message } = json;
      // 2** 字段表示请求成功
      if (code && (code >= 300 || code < 200)) {
        // error
        notification.error({
          message,
          description: message,
        });
        return {
          ...json,
          error: true,
        };
      }
      return json;
    })
    .catch((e) => {
      const { dispatch } = store;
      const status = e.name;
      const errorResponse = { error: true };
      if (status === 401) {
        dispatch({
          type: 'login/logout',
        });
        return errorResponse;
      }
      if (status === 403) {
        dispatch(routerRedux.push('/exception/403'));
      }
      if (status <= 504 && status >= 500) {
        dispatch(routerRedux.push('/exception/500'));
      }
      if (status >= 404 && status < 422) {
        dispatch(routerRedux.push('/exception/404'));
      }
    });
}

export function checkResponses(response, callback) {
  if (response && response.error) return;
  if (callback) {
    callback(response);
  }
}
