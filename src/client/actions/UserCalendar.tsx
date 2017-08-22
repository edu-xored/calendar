import { createActions } from 'redux-actions';


export const {
    setEnterDate,
    setEnterMonth,
    setEnterYear,
    setCalendarId,
    setTypeOfEvent
} = createActions({
    SET_ENTER_DATE: (enterDate: number) => ({enterDate}),
    SET_ENTER_MONTH: (enterMonth: number) => ({enterMonth}),
    SET_ENTER_YEAR: (enterYear: number) => ({enterYear}),
    SET_CALENDAR_ID: (calendarId: string) => ({calendarId}),
    SET_TYPE_OF_EVENT: (typeOfEvent: string) => ({typeOfEvent})
});