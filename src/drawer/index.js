import React from 'react'

export default class Drawer extends React.Component {
    static defaultProps = {
        title: 'Title here',
        content: 'Content here',
        onClose: () => {console.log ('onDrawerClose')}
    };

    render() {
        return <div id='sidebar'>
            <div className='sidebar-title panel'>
                <div>{this.props.title}</div>
                <button className='btn-close-sidebar' type='button' onClick={this.props.onClose}>
                    <i className='icon-big-close'></i>
                </button>
                <div>{this.props.content}</div>
            </div>
        </div>;
    }
}



