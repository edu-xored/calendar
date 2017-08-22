import {handleActions} from 'redux-actions';
import * as moment from 'moment';


import {setEnterDate, setEnterMonth, setEnterYear,setCalendarId, setTypeOfEvent} from '../actions/UserCalendar';


const defoultState = {
    enterDate: moment().date(),
    enterMonth: moment().month(),
    enterYear: moment().year(),
    calendarId: '',
    typeOfEvent: ''
};

const reducerUserCalendar = handleActions({
    [setEnterDate]: (state, action) => ({
        enterDate: action.payload.enterDate,
        enterMonth: state.enterMonth,
        enterYear: state.enterYear,
        calendarId: state.calendarId,
        typeOfEvent: state.typeOfEvent
    }),
    [setEnterMonth]: (state, action) => {
        console.log(action.payload);
        console.log(state);
        return ({
        enterDate: action.payload.enterDate,
        enterMonth: action.payload.enterMonth,
        enterYear: state.enterYear,
        calendarId: state.calendarId,
        typeOfEvent: state.typeOfEvent
    });},
    [setEnterYear]: (state, action) => ({
        enterDate: action.payload.enterDate,
        enterMonth: state.enterMonth,
        enterYear: action.payload.enterYear,
        calendarId: state.calendarId,
        typeOfEvent: state.typeOfEvent
    }),
    [setCalendarId]: (state, action) => {
        console.log(action.payload);
        console.log(state);
        return ({
        enterDate: state.enterDate,
        enterMonth: state.enterMonth,
        enterYear: state.enterYear,
        calendarId: action.payload.calendarId,
        typeOfEvent: state.typeOfEvent
    });},
    [setTypeOfEvent]: (state, action) => ({
        enterDate: state.enterDate,
        enterMonth: state.enterMonth,
        enterYear: state.enterYear,
        calendarId: state.calendarId,
        typeOfEvent: action.payload.typeOfEvent
    })
}, {
    state: defoultState
});

export default reducerUserCalendar;
