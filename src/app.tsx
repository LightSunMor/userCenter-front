import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { PageLoading, SettingDrawer } from '@ant-design/pro-components';
// @ts-ignore
import type { RunTimeLayoutConfig } from 'umi';
import { history, Link } from 'umi';
import defaultSettings from '../config/defaultSettings';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import {RequestConfig} from "umi";
import {message} from "antd";

// 标志process.env.NODE_ENV，通过这个可以拿到实时标志，判断到底是线上还是生产环境
const isDev = process.env.NODE_ENV === 'development';

const loginPath = '/user/login';
//@MorSun 添加一个白名单（没有登录也可以访问的页面路由）
const NO_NEED_LOGIN_WHITE_LIST=['/user/register',loginPath];

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
  export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
    console.log(process.env.NODE_ENV)
  //获取登录用户的信息
  const fetchUserInfo = async () => {
    try {
      //不能返回对象外再包含一个对象，使用user.data返回的对象不对，是undefined
      const res = await queryCurrentUser();
      console.log("获取当前用户状态")
      console.log(res.data)
      if (res.code!==200)
        throw new Error("error "+res.description)
      return res.data; //返回一个对象
    } catch (error: any) {
      message.error(error.message ?? "获取当前用户态失败")
      //出错就让login路径push入history
      history.push(loginPath);
    }
    return undefined;
  };

  // 如果是白名单页面，执行
  if (NO_NEED_LOGIN_WHITE_LIST.includes(history.location.pathname )) {
    return {
      fetchUserInfo,
      settings: defaultSettings,
    };
  }
  //如果不是白名单页面，说明已经登录，还要返回用户信息
  const currentUser = await fetchUserInfo();
  return {
    fetchUserInfo:fetchUserInfo,
    currentUser:currentUser,
    settings: defaultSettings,
  };
}

/*  配置request的运行时配置 超时时间为1000秒*/
export const request: RequestConfig = {
  timeout: 1000000,
  // 没有申请域名的情况下可以直接使用ip地址
  prefix:process.env.NODE_ENV==='production'?'http://124.222.111.223:8081/api':'http://localhost:8081/api'
};

// ProLayout 支持的api https://procomponents.ant.design/components/layout
//水印信息打印（插件使用）
// @ts-ignore
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.nickName,
    },
    footerRender: () => <Footer />,
    //每次页面切换的时候触发,验证白名单
    onPageChange: () => {
      const { location } = history;

      if (NO_NEED_LOGIN_WHITE_LIST.includes(location.pathname)) //如果location的pathname即url在白名单内
      {
        return; //直接返回
      }
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        console.log("不满足跳转页面条件")
        console.log(initialState?.currentUser)
        history.push(loginPath);
      }
    },
    links: isDev
      ? [
          <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>,
          <Link to="/~docs" key="docs">
            <BookOutlined />
            <span>业务组件文档</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: ( children: any, props: { location: { pathname: string | string[]; }; }) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState: any) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};
