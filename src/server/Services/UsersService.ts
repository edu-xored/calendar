import { UsersProvider } from "../Providers/UsersProvider";
import { User } from  '../../lib/model';

export class UsersService
{
    public static Users(): User[]
    {
        return UsersProvider.GetAll();
    }

    public static User(id: string): User
    {
        return UsersProvider.Get(id);
    }
}