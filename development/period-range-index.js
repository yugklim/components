import React from 'react'
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
//import '../src/styles/main.less';
//import Drawer from "../dist";
import Drawer from "../src/drawer";
import PeriodRange from "../src/period-range";

ReactDOM.render(<PeriodRange beginDay="3" beginMonth="Mar" endDay="11" endMonth="Jun"/>, document.getElementById('app'));

// render({
//         $$typeof: Symbol.for('react.element'),
//         type: TableView
//     },
//     document.getElementById('app'));
