import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withNotes } from '@storybook/addon-notes';
import { withKnobs, date } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';

import PeriodRange from '../src/period-range';
import '../src/period-range/style/index.js';

const periodRangeStories = storiesOf('PeriodRange', module);

periodRangeStories.addDecorator(withKnobs);

periodRangeStories
    .add('default', withInfo('Shows time period as range from the begin date till end date.')(
    withNotes('This is a lightweight component designed for using in Flux environment (e.g. Redux).' +
        'It only displays the begin and end dates. All date logic like setting begin and start date is' +
        ' subject to the state container.')(
    () => {
        const defaultBegin = new Date(2017, 7, 17);
        const defaultEnd = new Date(2017, 7, 24);
        return  <PeriodRange
            period={{begin: new Date(date('begin', defaultBegin)), end: new Date(date('end', defaultEnd))}}
            onPrevClick={action('previous click')}
            onNextClick={action('next click')}/>;
    }
)));


