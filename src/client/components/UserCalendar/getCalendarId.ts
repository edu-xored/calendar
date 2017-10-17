import API from './../../api';
import {User, Team, Calendar} from './../../../lib/model';


export async function getCalendarId(user: User) {

    console.log("1111111111111111111111111111111111111111111111111111111111");

    let teams: Team[] = await API.teams.getList();
    let calendars: Calendar[] = await API.calendars.getList();

    console.log("DBWorker teams", teams);
    console.log("DBWorker calendars", calendars);

    console.log("DBWorker members 0",teams[0].members);
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



export default getCalendarId;