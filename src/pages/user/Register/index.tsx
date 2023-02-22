import Footer from '@/components/Footer';
import { register} from '@/services/ant-design-pro/api';
// import { getFakeCaptcha } from '@/services/ant-design-pro/login';
import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  // ProFormCaptcha,
  // ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { Alert, message, Tabs } from 'antd';
import React, { useState } from 'react';
import { history } from 'umi';
import styles from './index.less';
//导入目标资源
import {MYGITHUB, SYSTEM_LOGO} from "@/constants";

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);
// 整个是一个页面，由Register 引用
const Register: React.FC = () => {
  // @ts-ignore
  const [userLoginState] = useState<API.RegisterResult>({});
  const [type, setType] = useState<string>('account');

  const handleSubmit = async (values: API.RegisterParams) => {
    //先取值，从values中
    const {userPassword,checkPassword}=values;
    //校验，直接在前端校验，免得到后端浪费资源
    if (userPassword!==checkPassword)
    {
      message.error('用户两次密码不一致');
      return ;
    }
    try {
      // 注册
      const res = await register({ ...values, type });

      if (res.code===200&&res.data>0) {
        const defaultLoginSuccessMessage = '注册成功！';
        message.success(defaultLoginSuccessMessage);

        //注册成功，跳转到登录页
        /** 此方法会跳转到 redirect 参数所在的位置 */
        //如果history没有被修改，就直接return
        if (!history) return;
        //获取url
        const { query } = history.location;
        //跳转到登录页,登录后会作判断是否有query路径，然后判断是否继续跳转redirect对应的页面
        // console.log(history)
        history.push({
            pathname:'/user/login',
            query
        })
        // console.log(history)
        return;
      }
      else
      {
        //抛出异常被下方捕获 （下面写法是前端写法）
        throw new Error(`error`+res.description);
      }
    } catch (error: any) {
      const defaultLoginFailureMessage = '注册失败，请重试！';
      message.error(error.message ?? defaultLoginFailureMessage);
    }
  };
//页面代码（非逻辑）
  // @ts-ignore
  const { status, type: loginType } = userLoginState;
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          submitter={{
            searchConfig:{
              submitText:'注册'
            }
          }}
          logo={<img alt="logo" src={SYSTEM_LOGO} />}
          title="Model For Ant Design"
          subTitle={<a href={MYGITHUB} target="_blank" rel="noreferrer">用户中心管理系统</a>}
          initialValues={{
            autoLogin: true,
          }}
          //提交表单
          onFinish={async (values) => {
            await handleSubmit(values as API.RegisterParams);
          }}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane key="account" tab={'账户注册'} />
          </Tabs>

          {status === 'error' && loginType === 'account' && (
            <LoginMessage content={'错误的账号和密码'} />
          )}
          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'账号'}
                rules={[
                  {
                    required: true,
                    message: '账号是必填项！',
                  },
                  {
                    min:4,
                    type:'string',
                    message: '账号长度不能小于4位！',
                  }
                ]}
              />

              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                  {
                    min: 8,
                    type:'string',
                    message: '密码长度不能小于8位！',
                  }
                ]}
              />
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'请再次输入密码'}
                rules={[
                  {
                    required: true,
                    message: '验证密码是必填项！',
                  },
                  {
                    min: 8,
                    type:'string',
                    message: '密码长度不能小于8位！',
                  }
                ]}
                />
              <ProFormText
                name="planetCode"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'Planet编号'}
                rules={[
                  {
                    required: true,
                    message: '编号是必填项！',
                  },
                  // {
                  //   max:5,
                  //   type:'string',
                  //   message: '编号长度不能高于5位！',
                  // }
                ]}
              />
            </>
          )}
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
