import { createActions } from 'redux-actions';

export type calendarGrid = {month: number, year: number}

export const {
    setEnterStartDate,
    setEnterEndDate,
    setEnterCalendarGrid,
    setTypeOfEvent
} = createActions({
    SET_ENTER_START_DATE: (enterStartDate: number) => ({enterStartDate}),
    SET_ENTER_END_DATE: (enterEndDate: number) => ({enterEndDate}),
    SET_ENTER_CALENDAR_GRID: (enterCalendarGrid: calendarGrid) => ({enterCalendarGrid}),
    SET_TYPE_OF_EVENT: (typeOfEvent: string) => ({typeOfEvent})
});