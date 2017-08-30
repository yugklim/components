import React from 'react';
import classNames from 'classnames';

export default class PeriodRange extends React.Component {
    static defaultProps = {
        period: {
            begin: new Date(),
            end: new Date()
        },
        type: '',
        onPrevClick: () => {console.log ('onPrevClick')},
        onNextClick: () => {console.log ('onNextClick')}
    };

    render() {
        const dateRangeType = classNames(
            `date-range-${this.props.type} `
        );

        return (
            <div className={'date-range ' + dateRangeType}>
                <button type='button' className='pull-left btn-prev' onClick={this.props.onPrevClick}>
                    <i className='icon-left'></i>
                </button>
                <button type='button' className='pull-right btn-next' onClick={this.props.onNextClick}>
                    <i className='icon-right'></i>
                </button>
                {(this.props.period && this.props.period.begin && this.props.period.end)?
                <div className='holder'>{this.props.period.begin.getDate()}
                    {(this.props.period.begin.getMonth() == this.props.period.end.getMonth())?
                        ''
                        :` ${this.props.period.begin.toLocaleString('en-us', { month: 'long' })}`} — {this.props.period.end.getDate()} {this.props.period.end.toLocaleString('en-us', { month: 'long' })}
                </div>
                :<div className='holder'>no info</div>}
            </div>
        );
    }
}