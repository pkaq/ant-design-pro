import React from 'react';
import { message } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import moment from 'moment';
import copy from 'copy-to-clipboard';

import { fetch } from './services/onlineSvc';

export default () => {
    const columns = [
      {
        title: '用户名',
        dataIndex: 'account',
        ellipsis: true,
      },
      {
        title: '设备',
        dataIndex: 'device',
        hideInSearch: true,
        ellipsis: true,
      },
      {
        title: '版本',
        dataIndex: 'version',
        hideInSearch: true,
      },
      {
        title: '登录时间',
        dataIndex: 'loginTime',
        hideInSearch: true,
        render: val => moment(val).format("YYYY-MM-DD hh:mm:ss"),
      },
      {
        title: '签发时间',
        dataIndex: 'issuedAt',
        hideInSearch: true,
        ellipsis: true,
        render: val => moment(val).format("YYYY-MM-DD hh:mm:ss"),
      },
      {
        title: '过期时间',
        dataIndex: 'expireAt',
        hideInSearch: true,
        render: val => moment(val).format("YYYY-MM-DD hh:mm:ss"),
      },
      {
        title: 'token',
        dataIndex: 'token',
        hideInSearch: true,
        ellipsis: true,
        width: 240,
        render: (val, record) => (
          <div>
            {val}
              <a style={{padding: 0}} onClick={()=>{
                if(copy(record.token)){
                  message.success("token已成功复制到剪贴板");
                } else {
                  message.error("复制失败,请重新尝试")
                }
              }}>
                复制到剪贴板
              </a>
          </div>
        ),
      },
    ];

    const tableProps = {
      columns,
      headerTitle: '在线用户名单',
      rowKey: 'id',
      rowSelection: {},
      request: params => fetch(params),
      tableAlertRender: selectedRowKeys => (
        <div>
          已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项
        </div>
      )
    };

    return (
      <PageHeaderWrapper>
        <ProTable {...tableProps} />
      </PageHeaderWrapper>
    )
}

