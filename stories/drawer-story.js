/**
 * Created by eklimenko on 8/19/2017.
 */
import React from 'react';
import { Layout } from 'antd';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withNotes } from '@storybook/addon-notes';
import { withKnobs, text } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';

import Drawer from '../src/drawer';
import '../src/drawer/style/index.js';

const drawerStories = storiesOf('Drawer', module);
drawerStories.addDecorator(withKnobs);

drawerStories
    .add('default', withInfo('Panel designed for using in side bar.')(
        withNotes('Us it inside the antd Sider control.')(
    () => {
        const defaultTitle = <div>
                <h2>Senior .NET developer</h2>
                <p>Senior / Strong middle designer</p>
                <p>absC. Finance. Gobsnack \ Salses \ Gobamack \ Restart</p>
            </div>;

        const defaultContent = <div>
            <h2>Senior .NET developer content</h2>
        </div>;
        return <Drawer
            title={ text('Title', defaultTitle) }
            content={ text('Content', defaultContent) }
            onClose={action('onClose')}/>
    }
)));

