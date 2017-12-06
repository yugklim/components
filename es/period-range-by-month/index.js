import React from 'react';
import PropTypes from 'prop-types';
import RangeElement from './range-element'
import _ from 'lodash'
import normalizePeriods from '../utils/normalizePeriod'

export default class PeriodRangeByMonth extends React.Component {

    static defaultProps = {
        periods: [],
        type: '',
        onPreviousMonthClick: (monthSelected) => {console.log (`'onPrevClick' - ${monthSelected} `)},
        onNextMonthClick: (monthSelected) => {console.log (`'onNextClick' - ${monthSelected} `)},
        onRangeClick: (selectedRange) => {console.log (`onRangeClick ${selectedRange}`)},
        prevButtonDisabled: false,
        nextButtonDisabled: false
    };

    static contextTypes = {
        complementPeriods: PropTypes.func
    };

    static noPeriodInfo = 'No selected period';

    constructor(props) {
        super(props);
        const {selectedRange} = props;
        this.state = {
            monthSelected: (_.isEmpty(selectedRange)||((!selectedRange.begin&&!selectedRange.startDate)))?new Date(): new Date(selectedRange.begin||selectedRange.startDate)
            , selectedRange: props.selectedRange
        }

        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleEscClick = this.handleEscClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const {selectedRange} = nextProps;
        this.setState({
            monthSelected: (_.isEmpty(selectedRange)||((!selectedRange.begin&&!selectedRange.startDate)))?new Date(): new Date(selectedRange.begin||selectedRange.startDate)
            , selectedRange
        });
    }

    toggleRanges() {
        this.container.style.display = (this.container.style.display=='block')?'none':'block';
    }

    hideRanges() {
        this.container.style.display = 'none';
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

    markSelectedPeriod(period, periods) {
        _.forEach(periods, p => {
            p.selected = p.selected || (p.startDate<=period.startDate && p.endDate>=period.endDate)
        })
    }

    onRangeClick(range) {
        const rangeClone = _.cloneDeep(range)
        const {periods} = this.props;
        _.forEach(periods, p => delete p.selected);
        if (!rangeClone.selected) {
            this.setState({selectedRange: rangeClone});
        }
        else {
            this.setState({selectedRange: {}});
        }

        if (this.props.onRangeClick) {
            this.props.onRangeClick(rangeClone);
        }
    }

    dropRange(e) {
        e.stopPropagation();
        const {selectedRange} = this.state;
        const rangeClone = _.cloneDeep(selectedRange);
        rangeClone.selected=true;
        const {periods} = this.props;
        _.forEach(periods, p => delete p.selected);
        this.setState({selectedRange: {}});
        if (this.props.onRangeClick) {
            this.props.onRangeClick(rangeClone);
        }
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.hideRanges();
        }
    }

    handleEscClick(event) {
        if (event.keyCode == 27) {
            this.hideRanges();
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
        document.addEventListener('keyup', this.handleEscClick);
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
        document.removeEventListener('keyup', this.handleEscClick);
    }


    render() {
        const complementPeriods = this.context.complementPeriods;
        const {periods} = this.props;
        const {selectedRange} = this.state;
        normalizePeriods([selectedRange]);
        normalizePeriods(periods);
        const complementedPeriods = complementPeriods? complementPeriods(this.state.monthSelected, periods): periods;
        this.markSelectedPeriod(selectedRange, complementedPeriods);
        return (
            <div className='range-container' ref={this.setWrapperRef.bind(this)}>
                <div  onClick={this.toggleRanges.bind(this)}>
                    {(selectedRange && selectedRange.begin && selectedRange.end)?
                        <div className='range-indicator'>
                            <div className='holder'>
                                {selectedRange.begin.getDate()}
                                {(selectedRange.begin.getMonth() == selectedRange.end.getMonth())?
                                    ''
                                    :` ${selectedRange.begin.toLocaleString('en-us', { month: 'long' })}`} — {selectedRange.end.getDate()} {selectedRange.end.toLocaleString('en-us', { month: 'long' })}
                            </div>
                            <div className='range-selector-close' >
                                <button type='button' onClick={::this.dropRange}>
                                    <i className='icon-small-close'></i>
                                </button>
                            </div>
                        </div>
                        :<div className='range-indicator'>
                            <div className='holder'>{PeriodRangeByMonth.noPeriodInfo}</div>
                        </div>
                    }
                </div>

            <div className={'range-selector'} ref={(container) => { this.container=container; }}  style={{display:'none'}}>
                <div className='month-selector'>
                    <div className='inner'>
                        {
                            (this.props.prevButtonDisabled === true)?
                                <button type='button' disabled className='pull-left btn-prev-disabled'>
                                    <i className='icon-left'></i>
                                </button>
                                :<button type='button' className='pull-left btn-prev' onClick={::this.onPrevMonthClick}>
                                <i className='icon-left'></i>
                            </button>
                        }
                        {
                            (this.props.nextButtonDisabled === true)?
                                <button type='button' disabled className='pull-right btn-next'>
                                    <i className='icon-right'></i>
                                </button>
                                :<button type='button' className='pull-right btn-next' onClick={::this.onNextMonthClick}>
                                <i className='icon-right'></i>
                            </button>
                        }
                        {
                            this.state.monthSelected?
                                <div className='holder'>
                                    {/*TODO put locale to const*/}
                                    {this.state.monthSelected.toLocaleString('en-us', { month: 'long' })} {this.state.monthSelected.getFullYear()}
                                </div>
                                :<div className='holder'>no info</div>
                        }
                    </div>
                </div>
                <div ref={(ranges) => { this.ranges= ranges; }} id='x' >
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
                                    onClick={this.onRangeClick.bind(this, proposedPeriod)}
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