import { isUrl } from './utils';

// 将菜单转成  manage/user形式
// 如果当前节点权限为空，则用父节点权限代替
function formatter(data, parentPath = '', parentAuthority) {
  return data.map((item) => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getFullPathMenusList = (menuData) => {
  return menuData ? formatter(menuData) : [];
};
