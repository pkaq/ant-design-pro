import React, { PureComponent } from 'react';
import { TreeSelect  } from 'antd';
import request from '@/utils/request';
/**
 * 远程获取树形结构下拉菜单选项
 */
export default class TreeSelector extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      treeData: [],
    };
  }
  componentDidMount() {
    const url = this.props.url;
    if (url) {
      request(url).then( response => {
          if(response && response.data){
            let treeData = response.data;
            treeData.unshift({
                key: '',
                value: '',
                title: '全部'
            });
            this.setState({
              treeData: response.data
            })
          }
      });
    }
  }

  render() {
    const { treeData } = this.state;
    return (
      <TreeSelect { ...this.props } treeData={ treeData } treeNodeLabelProp="pathName" />
    )
  }
}
