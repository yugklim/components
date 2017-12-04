import _ from 'lodash'

function normalizePeriod (period) {
    period.startDate = period.begin = period.startDate || period.begin;
    period.endDate = period.end = period.endDate || period.end;
    if (typeof period.startDate == 'string') period.begin = period.startDate = new Date(period.startDate);
    if (typeof period.endDate == 'string') period.end = period.endDate = new Date(period.endDate);
}

export default function normalizePeriods (periods) {
    _.forEach(periods, p => normalizePeriod(p));
}