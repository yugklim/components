import React from 'react'
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
//import '../src/styles/main.less';
//import Drawer from "../dist";
import Drawer from "../src/drawer";
import PeriodRange from "../src/period-range";

ReactDOM.render(
    <div>
        <PeriodRange/>
        <PeriodRange prevButtonDisabled={true} nextButtonDisabled={true}/>
    </div>, document.getElementById('app'));
