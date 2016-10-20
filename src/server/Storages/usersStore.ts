import { User } from '../../lib/model';

const demoUsers: User[] = [{
    id: '1',
    name: 'Bob',
    login: 'bob',
}];

// TODO: Established database connection.

export function getUsers(filter?: any): Promise<User[]> {
    return new Promise((resolve, reject) => {
        resolve(demoUsers);
    });
}

// export function getUsers(): Promise<User[]> {
//     let result: User[] = await demoUsers;
//     return result;
// }

// export function getUser(id: string): Promise<User> {
//     let result: User = demoUsers.filter((user) => { user.id == id })
//     return result;
// }