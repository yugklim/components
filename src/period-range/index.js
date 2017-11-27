import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import RangeElement from '../period-range/range-element'

export default class PeriodRange extends React.Component {
    static defaultProps = {
        periods: [],
        type: '',
        onPrevClick: () => {console.log ('onPrevClick')},
        onNextClick: () => {console.log ('onNextClick')},
        prevButtonDisabled: false,
        nextButtonDisabled: false
    };

    componentDidMount() {
        if (this.props.onDidMount && typeof this.props.onDidMount === 'function') {
            this.props.onDidMount();
        }
    }

    render() {
        const dateRangeType = classNames(
            `date-range-${this.props.type} `
        );

        return (
                <div className={'date-range ' + dateRangeType}>
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
                            <div className='holder'>{this.props.period.begin.getDate()}
                                {(this.props.period.begin.getMonth() == this.props.period.end.getMonth())?
                                    ''
                                    :` ${this.props.period.begin.toLocaleString('en-us', { month: 'long' })}`} — {this.props.period.end.getDate()} {this.props.period.end.toLocaleString('en-us', { month: 'long' })}
                            </div>
                            :<div className='holder'>no info</div>
                    }
                    <div>
                        {
                            this.props.periods.map((period, idx, periods) => {
                                    const previousPeriod = periods[idx-1];
                                    const markMonth = !previousPeriod || period.begin.getMonth() !== previousPeriod.begin.getMonth();
                                    return <RangeElement period={period} markMonth={markMonth} {...this.props}></RangeElement>
                                }
                            )
                        }
                        {/*<div className='period-square new-raw'><p>1</p></div><div className='period-square'><p>2</p></div><div className='period-square'><p>3</p></div>*/}
                        {/*<div className='period-square new-raw'><p>4</p></div><div className='period-square'><p>5</p></div><div className='period-square'><p>6</p></div>*/}
                        {/*<div className='period-square new-raw'><p>7</p></div><div className='period-square'><p>8</p></div><div className='period-square'><p>9</p></div>*/}
                    </div>
                </div>
        );
    }
}

PeriodRange.propTypes = {
    prevButtonDisabled: PropTypes.bool,
    nextButtonDisabled: PropTypes.bool
}