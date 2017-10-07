import API from './../../api';
import {User, Team, Calendar} from './../../../lib/model';


export async function getCalendarId(user: User) {
    let teams: Team[] = await API.teams.getList();
    let calendars: Calendar[] = await API.calendars.getList();

    console.log("DBWorker teams", teams);
    console.log("DBWorker calendars", calendars);

    let neededTeamId: string = "Team is not found...";
    for (let i = 0; i < teams.length; i++)
        for (let j = 0; j < teams[i].members.length; j++)
            if (teams[i].members[j] === user) {
                neededTeamId = teams[i].id;
                break;
            }
    console.log("DBWorker", neededTeamId);
    let calendarId: string = "Calendar is not found...";
    for (let i = 0; i < calendars.length; i++)
        if (calendars[i].teamId === neededTeamId) {
            calendarId = calendars[i].id;
            break;
        }
    
    console.log("DBWorker", calendarId);
    return calendarId;
}

const  getCalendarId1 = (user: User) => {
    let teams:Team[] = API.teams.getList()
    .then ( 
        teams => {
            return teams;
    });

    console.log("DBWorker user", user);
    console.log("DBWorker teams", teams);

    let calendars: Calendar[]; 
    API.calendars.getList()
    .then (
        calen => {
            return calendars;
        }
    );

    console.log("DBWorker calendars", calendars);

    let neededTeamId: string = "Team is not found...";
    for (let i = 0; i < teams.length; i++)
        for (let j = 0; j < teams[i].members.length; j++)
            if (teams[i].members[j] === user) {
                neededTeamId = teams[i].id;
                break;
            }
    console.log("DBWorker", neededTeamId);
    let neededCalendarId: string = "Calendar is not found...";
    for (let i = 0; i < calendars.length; i++)
        if (calendars[i].teamId === neededTeamId) {
            neededCalendarId = calendars[i].id;
            break;
        }
    
    console.log("DBWorker", neededCalendarId);
    return neededCalendarId;
}

export default getCalendarId;