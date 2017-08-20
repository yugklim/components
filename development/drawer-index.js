import React from 'react'
import ReactDOM from 'react-dom';
import Drawer from '../src/drawer';
import { Layout } from 'antd';
const { Sider } = Layout;

// eslint-disable-next-line no-unused-vars
let sider;

let onCollapse = (collapsed) => {
    renderSider(collapsed);
};

let onClose = () => {
    renderSider(true);
};

let renderSider = (collapsed) => {
        ReactDOM.render(
            <Layout>
                <Sider ref={(me) => { sider = me; }}
                       width="535"
                       collapsedWidth = "10"
                       collapsible="true"
                       collapsed= {collapsed}
                       onCollapse={onCollapse}
                >
                    <div id="sidebar">
                        <Drawer
                            title = {
                                <div>
                                    <h2>Senior .NET developer</h2>
                                    <p>Senior / Strong middle designer</p>
                                    <p>absC. Finance.  Gobsnack \ Salses \ Gobamack \ Restart</p>
                                </div>
                            }
                            content = {
                                <div>
                                    <h2>Senior .NET developer content</h2>
                                </div>
                            }
                            onClose={onClose}/>
                    </div>
                </Sider>
            </Layout>,
            document.getElementById('app'));
    };

renderSider(false);

