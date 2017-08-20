import React from 'react'
import {shallow} from 'enzyme'
import Drawer from '../../../src/drawer/index.js'

function setup() {
    const props = {
        title: 'This is the title',
        content: 'This is the content'
    }

    const drawer = shallow(<Drawer {...props}/>)

    return {
        props,
        drawer
    }
}

describe('Drawer rendering test', () => {

    it('should render title', () => {
        const {props, drawer} = setup();
        let title = drawer.findWhere(d => d.text() == props.title);
        expect(title.node).toBeTruthy();
    });

    it('should render content', () => {
        const {props, drawer} = setup();
        let content = drawer.findWhere(d => d.text() == props.content);
        expect(content.node).toBeTruthy();
    });

    it('should render close button', () => {
        const {props, drawer} = setup();
        let content = drawer.find('button');
        expect(content.node).toBeTruthy();
    });

});

