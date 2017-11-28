import React from 'react';

export default class RangeElement extends React.Component {

    render() {
        return(
            <div className={'period-square'} onClick={this.props.onClick}>
                <div className={`period-month${this.props.markMonth?' month-begins':''}`}>
                    {this.props.monthName?
                        this.props.period.begin.toLocaleString('en-us', { month: 'long' }).toUpperCase()
                        :null}
                </div>
                <div className={'period-square-inner'}>
                    <p>
                        {this.props.period.begin.getDate()}-{this.props.period.end.getDate()}
                    </p>
                </div>
            </div>
        );
    }
}