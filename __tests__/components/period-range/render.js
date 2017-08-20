import React from 'react'
import {shallow} from 'enzyme'
import PeriodRange from '../../../src/period-range/index.js'

function setup(begin, end) {
    const props = {
        period: {
            begin: begin,
            end: end
        }
    }

    const periodRange = shallow(<PeriodRange {...props}/>)

    return {
        props,
        periodRange
    }
}

describe('Period range rendering test', () => {

    it('should render month once', () => {
        const {props, periodRange} = setup(new Date(2000, 0, 1), new Date(2000, 0, 5));
        let range = periodRange.find('[className="holder"]');
        expect(range.text()).toBe('1 — 5 January');
    });

    it('should render months', () => {
        const {props, periodRange} = setup(new Date(2000, 0, 1), new Date(2000, 1, 5));
        let range = periodRange.find('[className="holder"]');
        expect(range.text()).toBe('1 January — 5 February');
    });

});

