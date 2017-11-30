import React from 'react';

export default class RangeElement extends React.Component {

    static defaultProps = {
        proposedPeriod: {
            begin: new Date(),
            end: new Date()
        }
    };

    render() {
        return(
            <div className={'period-square'} onClick={this.props.onClick}>
                <div className={`period-month${this.props.markMonth?' month-begins':''}`}>
                    {this.props.monthName?
                        this.props.proposedPeriod.begin.toLocaleString('en-us', { month: 'long' }).toUpperCase()
                        :null}
                </div>
                <div className={'period-square-inner'}>
                    <p>
                        {this.props.proposedPeriod.begin.getDate()}-{this.props.proposedPeriod.end.getDate()}
                    </p>
                </div>
            </div>
        );
    }
}