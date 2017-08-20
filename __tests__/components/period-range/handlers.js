import React from 'react'
import {shallow} from 'enzyme'
import sinon  from 'sinon'
import PeriodRange from '../../../src/period-range/index.js'

function setup() {
    const onPrevClick = sinon.spy();
    const onNextClick = sinon.spy();
    const props = {
        period: {
            begin: new Date(),
            end: new Date()
        },
        onPrevClick: onPrevClick,
        onNextClick: onNextClick
    }

    const periodRange = shallow(<PeriodRange {...props}/>)

    return {
        props,
        periodRange
    }
}

describe('PeriodRange click test', () => {

    it('should call onPrevClick when clicking previous button', () => {
        const {props, periodRange} = setup();
        let prevButton =  periodRange.find('[className="pull-left btn-prev"]')
        prevButton.simulate('click')
        expect(props.onPrevClick.calledOnce).toBe(true);
    });

    it('should call onNextClick when clicking next button', () => {
        const {props, periodRange} = setup();
        let nextButton =  periodRange.find('[className="pull-right btn-next"]')
        nextButton.simulate('click')
        expect(props.onNextClick.calledOnce).toBe(true);
    });

});

