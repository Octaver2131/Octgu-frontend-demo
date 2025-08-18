export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
    ],
  },
  { path: '/welcome', icon: 'LikeOutlined', component: './Welcome', name: '欢迎页', access: 'canUser' },
  { path: '/overview', icon: 'BarChartOutlined', component: './Overview', name: '概览页', access: 'canUser' },
  { path: '/item', icon: 'FormOutlined', component: './Item', name: '管理页',  access: 'canUser'},
  {
    path: '/admin',
    icon: 'crown',
    name: '管理页',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/user' },
      { icon: 'table', path: '/admin/user', component: './Admin/User', name: '用户管理' },
    ],
  },
  { path: '/', redirect: '/user/login' },
  { path: '*', layout: false, component: './404' },
];
