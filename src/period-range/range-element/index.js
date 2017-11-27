import React from 'react';

export default class RangeElement extends React.Component {

    render() {
        return <div className={'period-square'}>
            <p>
                <div style={{marginTop:'-35px', marginLeft:'-20px'}}>
                    {this.props.period.begin.toLocaleString('en-us', { month: 'long' }).toUpperCase()}
                </div>
                {this.props.period.begin.getDate()}-{this.props.period.end.getDate()}
            </p>
        </div>;
    }
}