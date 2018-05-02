import { getFullPathMenusList } from '../utils/menu';

const menuData = [
  {
    name: '图表',
    icon: 'dashboard',
    path: 'chart',
    children: [
      {
        name: '温度',
        path: 'temperature',
      },
    ],
  },
  {
    name: '系统管理',
    path: 'manage',
    icon: 'tool',
    children: [
      {
        name: '用户管理',
        path: 'user',
      }, {
        name: '角色管理',
        path: 'role',
      },
    ],
  }];

export const getMenuData = () => getFullPathMenusList(menuData);
