import React from 'react'
import {shallow} from 'enzyme'
import sinon  from 'sinon'
import Drawer from '../../../src/drawer/index.js'

function setup() {
    const onClose = sinon.spy();
    const props = {
        title: 'This is the title',
        content: 'This is the content',
        onClose: onClose
    }

    const drawer = shallow(<Drawer {...props}/>)

    return {
        props,
        drawer
    }
}

describe('Drawer click test', () => {

    it('should call close when clicking the close button', () => {
        const {props, drawer} = setup();
        let closeButton =  drawer.find('button')
        closeButton.simulate('click')
        expect(props.onClose.calledOnce).toBe(true);
    });

});

