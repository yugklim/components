import React from 'react';

export default class RangeElement extends React.Component {

    render() {
        return(
            <div className={'period-square'}>
                <div className={'period-month'}>
                    {this.props.markMonth?
                        this.props.period.begin.toLocaleString('en-us', { month: 'long' }).toUpperCase()
                        :null}
                </div>
                <div>
                    <p>
                        {this.props.period.begin.getDate()}-{this.props.period.end.getDate()}
                    </p>
                </div>
            </div>
        );
    }
}