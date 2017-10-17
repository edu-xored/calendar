import {handleActions} from 'redux-actions';
import * as moment from 'moment';


import {setEnterStartDate, setEnterEndDate, setEnterCalendarGrid, setTypeOfEvent, calendarGrid} from '../actions/UserCalendar';


const defaultState = {
    enterStartDate: moment().toDate(),
    enterEndDate: moment().toDate(),
    enterCalendarGrid: {month: moment().month(), year: moment().year()},
    typeOfEvent: ''
};

const reducerUserCalendar = handleActions({
    [setEnterStartDate]: (state, action) => {
        console.log(action.payload);
        return ({
            enterStartDate: action.payload.enterStartDate,
            enterEndDate: state.enterEndDate,
            enterCalendarGrid: state.enterCalendarGrid,
            typeOfEvent: state.typeOfEvent
    });},
    [setEnterEndDate]: (state, action) => {
        console.log(action.payload);
        return ({
            enterStartDate: state.enterStartDate,
            enterEndDate: action.payload.enterEndDate,
            enterCalendarGrid: state.enterCalendarGrid,
            typeOfEvent: state.typeOfEvent
    });},
    [setEnterCalendarGrid]: (state, action) =>{
        console.log(action.payload);
        return ({
            enterStartDate: state.enterStartDate,
            enterEndDate: state.enterEndDate,
            enterCalendarGrid: action.payload.enterCalendarGrid,
            typeOfEvent: state.typeOfEvent
    });},
    [setTypeOfEvent]: (state, action) => {
        console.log(action.payload);
        return ({
            enterStartDate: state.enterStartDate,
            enterEndDate: state.enterEndDate,
            enterCalendarGrid: state.enterCalendarGrid,
            typeOfEvent: action.payload.typeOfEvent
    });}
}, {
    state: defaultState
});

export default reducerUserCalendar;
