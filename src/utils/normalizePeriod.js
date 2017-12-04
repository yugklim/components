import _ from 'lodash'

function normalizePeriod (period) {
    if (period && period.begin) period.startDate = (typeof period.begin == 'string')?new Date(period.begin):period.begin;
    if (period && period.startDate) period.begin = (typeof period.startDate == 'string')?new Date(period.startDate):period.startDate;
    if (period && period.end) period.endDate = (typeof period.end == 'string')?new Date(period.end):period.end;
    if (period && period.endDate) period.end = (typeof period.endDate == 'string')?new Date(period.endDate):period.endDate;
    if (typeof period.startDate == 'string') period.startDate = new Date(period.startDate);
    if (typeof period.endDate == 'string') period.endDate = new Date(period.endDate);
}

export default function normalizePeriods (periods) {
    _.forEach(periods, p => normalizePeriod(p));
}