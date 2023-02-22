import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import {Button, message,} from 'antd';
import { useRef } from 'react';
// // @ts-ignore
// import {CurrentUser} from "@/services/ant-design-pro/typings";
import {getSearchUsers} from "@/services/ant-design-pro/api";

// 表格具体内容定义columns 然后传入组件中columns={columns}，就可自动生成表格
const columns: ProColumns<API.CurrentUser>[] = [
  //id
  {
    dataIndex: 'ids',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '用户名',
    dataIndex: 'nickName',
    copyable: true,
    ellipsis: true,
    tip: '标题过长会自动收缩',
  },
  {
    title: '用户账户',
    dataIndex: 'userAccount',
    copyable: true,
  },
  {
    title: '用户头像',
    dataIndex: 'avatar',
    //TODO:render属性使用了解
    render:(_,record)=>(
      <div>
        <img src={record.avatar} width={50}/>
      </div>
    )
  },
  {
    title: '性别',
    dataIndex: 'gender',
    valueType: 'select',
    valueEnum: {
      0:{text:'女'},
      1:{text:'男'},
    },
  },
  {
    title: '电话',
    dataIndex: 'phone',
    copyable: true,
    ellipsis: true,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    copyable: true,
    ellipsis: true,
    tip: '标题过长会自动收缩',
  },
  {
    title: '状态',
    dataIndex: 'userStatus',
    valueType: 'select',
    valueEnum: {
      0:{text:'正常',status:'Success'},
      1:{text:'异常',status:'Error'},
    },
  },
  {
    title: '权限',
    dataIndex: 'userRole',
    valueType: 'select',
    valueEnum: {
      0:{text:'普通用户',status:'Default'},
      1:{text:'管理员',status:'Success'},
    },
  },
  {
    title:'编号',
    dataIndex:'planetCode',
    copyable: true,
    tip:'星球编号用户唯一',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'date',
    sorter: true,
    hideInSearch: true,
  },

  {
    title: '创建时间',
    dataIndex: 'created_at',
    valueType: 'dateRange',
    hideInTable: true,
    search: {
      transform: (value) => {
        return {
          startTime: value[0],
          endTime: value[1],
        };
      },
    },
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.ids);
        }}
      >
        编辑
      </a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];


export default () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<API.CurrentUser>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      //重要的数据属性 向后端发出请求，请求表格的数据 没切换页面就会刷新一次
      //params是分页查询的参数，没有填写会爆红，但是不影响运行
      request={async (params = {}, sort, filter) => {
        console.log(sort, filter);
        const resList = await getSearchUsers();
        if (resList.code!==200)
        {
          message.error(resList.description);
        }
        //TODO:为什么一定需要指定一个data属性呢？
        return {data:resList.data}
      }}

      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="高级表格"
      toolBarRender={() => [
        <Button key="button" icon={<PlusOutlined />} type="primary">
          新建
        </Button>
      ]}
    />
  );
};
