// @ts-ignore
/* eslint-disable */

declare namespace API {

  type BaseResponse<T>={
    code:number;
    data:T; // 返回具体实用的用户信息
    message:string;
    description:string;
  }

  //参数和后端保持一致，因为是直接json形式返回对象到前端
  type CurrentUser = {
     ids:number;
     nickName:string;
     avatar?:string;
     gender:number;
     userAccount:string;
     phone?:string;
     email?:string;
     userStatus:number
     createTime:Date;
     userRole:number;
     planetCode:string;
  };
  type LoginResult = {
    ids:number;
    nickName:string;
    avatar?:string;
    gender:number;
    userAccount:string;
    phone?:string;
    email?:string;
    userStatus:number
    createTime:Date;
    userRole:number;
    planetCode:string;
  };

//因为只返回一个id不是对象
  type RegisterResult=number;

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    userAccount?: string;
    userPassword?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type RegisterParams = {
    userAccount?: string;
    userPassword?: string;
    checkPassword?: string;
    planetCode?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
