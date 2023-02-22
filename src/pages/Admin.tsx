// @ts-ignore
import { PageHeaderWrapper } from '@ant-design/pro-components';
import React from 'react';

const Admin: React.FC = (props) => {
  //导出子页面信息，就可以把子页面嵌套到父页面Admin中
  const {children}=props;
  return (
    <PageHeaderWrapper>
      {children}
    </PageHeaderWrapper>
  );
};

export default Admin;
