import React from 'react';
import PropTypes from 'prop-types';
import RangeElement from './range-element'
import PropRange from '../period-range'

export default class PeriodRangeByMonth extends React.Component {

    static defaultProps = {
        periods: [],
        period: {},
        type: '',
        onPreviousMonthClick: (monthSelected) => {console.log (`'onPrevClick' - ${monthSelected} `)},
        onNextMonthClick: (monthSelected) => {console.log (`'onNextClick' - ${monthSelected} `)},
        // eslint-disable-next-line no-unused-vars
        onRangeClick: (period) => {console.log ('onRangeClick')},
        prevButtonDisabled: false,
        nextButtonDisabled: false
    };

    static contextTypes = {
        complementPeriods: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = { monthSelected: new Date(props.period.begin||props.period.startDate) }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ monthSelected: new Date(nextProps.period.begin||nextProps.period.startDate)});
    }

    toggleRanges() {
        this.container.style.display = (this.container.style.display=='block')?'none':'block';
    }

    onNextMonthClick(e) {
        let {monthSelected} = this.state;
        monthSelected.setMonth(monthSelected.getMonth()+1);
        monthSelected.setDate(1);
        this.setState({ monthSelected: monthSelected });
        if (this.props.onNextMonthClick) this.props.onNextMonthClick(monthSelected, e);
    }

    onPrevMonthClick(e) {
        let {monthSelected} = this.state;
        monthSelected.setMonth(monthSelected.getMonth()-1);
        monthSelected.setDate(1)
        this.setState({ monthSelected: monthSelected });
        if (this.props.onPreviousMonthClick) this.props.onPreviousMonthClick(monthSelected, e);
    }

    componentDidMount() {
        if (this.props.onDidMount && typeof this.props.onDidMount === 'function') {
            this.props.onDidMount();
        }
    }

    render() {
        const complementPeriods = this.context.complementPeriods;
        const complementedPeriods = complementPeriods? complementPeriods({startDate:this.state.monthSelected}, this.props.periods): this.props.periods;
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
                                :<button type='button' className='pull-left btn-prev' onClick={this.onPrevMonthClick.bind(this)}>
                                <i className='icon-left'></i>
                            </button>
                        }
                        {
                            (this.props.nextButtonDisabled === true)?
                                <button type='button' disabled className='pull-right btn-next'>
                                    <i className='icon-right'></i>
                                </button>
                                :<button type='button' className='pull-right btn-next' onClick={this.onNextMonthClick.bind(this)}>
                                <i className='icon-right'></i>
                            </button>
                        }
                        {
                            (this.props.period && this.props.period.begin)?
                                <div className='holder'>
                                    {/*TODO put locale to const*/}
                                    {this.state.monthSelected.toLocaleString('en-us', { month: 'long' })} {this.state.monthSelected.getFullYear()}
                                </div>
                                :<div className='holder'>no info</div>
                        }
                    </div>
                </div>
                <div ref={(ranges) => { this.ranges= ranges; }} >
                    {
                        complementedPeriods.map((proposedPeriod, idx, periods) => {
                                const previousPeriod = periods[idx-1];
                                const monthName = (!previousPeriod || proposedPeriod.begin.getMonth() !== previousPeriod.begin.getMonth());
                                const markMonth = monthName && (idx%3 !== 0);
                                return <RangeElement
                                    key={`range-${idx}`}
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