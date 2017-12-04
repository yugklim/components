import React from 'react';

export default class RangeElement extends React.Component {

    static defaultProps = {
        proposedPeriod: {
            begin: new Date(),
            end: new Date(),
            locked: false,
            selected: false,
            onClick: (proposedPeriod) => {console.log (`'onRangeElementClick' - ${proposedPeriod}`)}
        }
    };

    render() {
        const {proposedPeriod} = this.props;
        return(
            <div className={`period-square ${proposedPeriod.locked?'locked':''} ${proposedPeriod.selected ? 'selected' : ''}`}
                onClick={this.props.onClick.bind(this, proposedPeriod)}>
                <div className={`period-month${this.props.markMonth?' month-begins':''}`}>
                    {this.props.monthName?
                        proposedPeriod.begin.toLocaleString('en-us', { month: 'long' }).toUpperCase()
                        :null}
                </div>
                <div className={'period-square-inner'}>
                    <p>
                        {proposedPeriod.begin.getDate()}-{proposedPeriod.end.getDate()}
                    </p>
                </div>
            </div>
        );
    }
}