import React from 'react'
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
//import '../src/styles/main.less';
//import Drawer from "../dist";
import Drawer from "../src/drawer";
import {PeriodRange, PeriodRangeByMonth} from "../src/period-range";

const periods = [
    {
        begin: new Date(2017, 4, 12),
        end: new Date(2017, 4, 18)
    }
    ,{
        begin: new Date(2017, 4, 19),
        end: new Date(2017, 4, 25)
    }
    ,{
        begin: new Date(2017, 4, 26),
        end: new Date(2017, 5, 2)
    }
    ,{
        begin: new Date(2017, 5, 3),
        end: new Date(2017, 5, 9)
    }
    ,{
        begin: new Date(2017, 5, 10),
        end: new Date(2017, 5, 16)
    }
    ,{
        begin: new Date(2017, 5, 17),
        end: new Date(2017, 5, 23)
    }
    ,{
        begin: new Date(2017, 5, 24),
        end: new Date(2017, 5, 30)
    }
    ,{
        begin: new Date(2017, 6, 1),
        end: new Date(2017, 6, 7)
    }
    ,{
        begin: new Date(2017, 6, 8),
        end: new Date(2017, 6, 14)
    }
    ]
ReactDOM.render(
    <div style={{marginLeft: '55px'}}>
        <div><PeriodRange /></div>
        <div><PeriodRangeByMonth periods={periods}/></div>
        <p>AAAA</p>
        <p>BBBB</p>
        <p>CCCC</p>
        <p>AAAA</p>
        <p>BBBB</p>
        <p>CCCC</p>
        <p>AAAA</p>
        <p>BBBB</p>
        <p>CCCC</p>
        {/*<PeriodRange prevButtonDisabled={true} />*/}
        {/*<PeriodRange nextButtonDisabled={true}/>*/}
    </div>, document.getElementById('app'));

