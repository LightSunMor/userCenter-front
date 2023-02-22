export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { name: '登录', path: '/user/login', component: './user/Login' },
      { name: '注册', path: '/user/register', component: './user/Register' },
      { component: './404' },
    ],
  },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  //以下管理页为管理员才会看到的页面 path父路径为 '/admin'
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    // 权限：限制不同的人有权力能不能访问,当前指如果权限满足canAdmin要求(access.ts中定义的)
    access: 'canAdmin',
    // 理解为 输入admin路径就访问Admin.tsx页面
    component: './Admin',
    routes: [
      { path: '/admin/user-manage', name: '用户管理页', icon: 'smile', component: './Admin/UserManage' },
      { component: './404' },
    ],
  },
  { name: '查询表格', icon: 'table', path: '/list', component: './TableList' },
  { path: '/', redirect: '/welcome' },
  // { icon: 'smile', path: '/sunlight', component: './DashboardAnalysis' },已删除对应页面
  { component: './404' },
];
