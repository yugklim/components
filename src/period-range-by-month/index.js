import React from 'react';
import PropTypes from 'prop-types';
import RangeElement from './range-element'
import PropRange from '../period-range'

export default class PeriodRangeByMonth extends React.Component {
    static defaultProps = {
        periods: [],
        period: {},
        type: '',
        onPrevClick: () => {console.log ('onPrevClick')},
        onNextClick: () => {console.log ('onNextClick')},
        // eslint-disable-next-line no-unused-vars
        onRangeClick: (period) => {console.log ('onRangeClick')},
        prevButtonDisabled: false,
        nextButtonDisabled: false
    };

    toggleRanges() {
        if (this.container.style.display == 'none') {
            //this.container.className = 'range-selector';
            this.container.style.display= 'block';
        }
        else {
            //this.container.className = 'range-selector-shortened';
            this.container.style.display = 'none';
        }
    }

    componentDidMount() {
        if (this.props.onDidMount && typeof this.props.onDidMount === 'function') {
            this.props.onDidMount();
        }
    }

    render() {
        return (
            <div>
                <div>
                    <PropRange onPeriodClick={this.toggleRanges.bind(this)} {...this.props}/>
                </div>
            <div className={'range-selector'} ref={(container) => { this.container=container; }}  style={{display:'none'}}>
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
                            (this.props.period && this.props.period.begin)?
                                <div className='holder'>
                                    {this.props.period.begin.toLocaleString('en-us', { month: 'long' })} {this.props.period.begin.getFullYear()}
                                </div>
                                :<div className='holder'>no info</div>
                        }
                    </div>
                </div>
                <div ref={(ranges) => { this.ranges= ranges; }} >
                    {
                        this.props.periods.map((proposedPeriod, idx, periods) => {
                                const previousPeriod = periods[idx-1];
                                const monthName = (!previousPeriod || proposedPeriod.begin.getMonth() !== previousPeriod.begin.getMonth());
                                const markMonth = monthName && (idx%3 !== 0);
                                return <RangeElement
                                    proposedPeriod={proposedPeriod}
                                    markMonth={markMonth}
                                    monthName={monthName}
                                    onClick={this.props.onRangeClick.bind(this, proposedPeriod)}
                                    {...this.props}>

                                </RangeElement>
                            }
                        )
                    }
                </div>
            </div>
            </div>
        );
    }
}

PeriodRangeByMonth.propTypes = {
    prevButtonDisabled: PropTypes.bool,
    nextButtonDisabled: PropTypes.bool
}