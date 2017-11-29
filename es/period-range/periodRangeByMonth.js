import React from 'react';
import PropTypes from 'prop-types';
import RangeElement from '../period-range-by-month/range-element'

export default class PeriodRangeByMonth extends React.Component {
    static defaultProps = {
        periods: [],
        type: '',
        onPrevClick: () => {console.log ('onPrevClick')},
        onNextClick: () => {console.log ('onNextClick')},
        // eslint-disable-next-line no-unused-vars
        onRangeClick: (period) => {console.log ('onRangeClick')},
        prevButtonDisabled: false,
        nextButtonDisabled: false
    };

    onMonthClick() {
        if (this.container.className === 'range-selector-shortened') {
            this.container.className = 'range-selector';
            this.ranges.style.visibility = 'visible';
        }
        else {
            this.container.className = 'range-selector-shortened';
            this.ranges.style.visibility = 'hidden';
        }
    }

    componentDidMount() {
        if (this.props.onDidMount && typeof this.props.onDidMount === 'function') {
            this.props.onDidMount();
        }
    }

    render() {

        return (
            <div className={'range-selector-shortened'} ref={(container) => { this.container=container; }}>
                <div className='month-selector'>
                    <div className='inner'>
                        {
                            (this.props.prevButtonDisabled === true)?
                                <button type='button' disabled className='pull-left btn-prev-disabled'>
                                    <i className='icon-left'></i>
                                </button>
                                :<button type='button' className='pull-left btn-prev' onClick={this.props.onPrevClick}>
                                <i className='icon-left'></i>
                            </button>
                        }
                        {
                            (this.props.nextButtonDisabled === true)?
                                <button type='button' disabled className='pull-right btn-next'>
                                    <i className='icon-right'></i>
                                </button>
                                :<button type='button' className='pull-right btn-next' onClick={this.props.onNextClick}>
                                <i className='icon-right'></i>
                            </button>
                        }
                        {
                            (this.props.period && this.props.period.begin && this.props.period.end)?
                                <div className='holder' onClick={this.onMonthClick.bind(this)}>{this.props.period.begin.getDate()}
                                    {(this.props.period.begin.getMonth() == this.props.period.end.getMonth())?
                                        ''
                                        //TODO: move locale to constants
                                        :` ${this.props.period.begin.toLocaleString('en-us', { month: 'long' })}`} — {this.props.period.end.getDate()} {this.props.period.end.toLocaleString('en-us', { month: 'long' })}
                                </div>
                                //TODO: remove click after debug
                                :<div className='holder' onClick={this.onMonthClick.bind(this)}>no info</div>
                        }
                    </div>
                </div>
                <div ref={(ranges) => { this.ranges= ranges; }} style={{visibility:'hidden'}}>
                    {
                        this.props.periods.map((period, idx, periods) => {
                                const previousPeriod = periods[idx-1];
                                const monthName = (!previousPeriod || period.begin.getMonth() !== previousPeriod.begin.getMonth());
                                const markMonth = monthName && (idx%3 !== 0);
                                return <RangeElement
                                    period={period}
                                    markMonth={markMonth}
                                    monthName={monthName}
                                    onClick={this.props.onRangeClick.bind(this, period)}
                                    {...this.props}>

                                </RangeElement>
                            }
                        )
                    }
                </div>
            </div>
        );
    }
}

PeriodRangeByMonth.propTypes = {
    prevButtonDisabled: PropTypes.bool,
    nextButtonDisabled: PropTypes.bool
}