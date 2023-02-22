/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 *  拿到当前用户的信息态，然后权限用来判断他能否进行一些操作
 * */
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};
  return {
    canAdmin: currentUser && currentUser.userRole === 1,
    //TODO: 未来可能会出现一些不同权限的用户设置
  };
}
