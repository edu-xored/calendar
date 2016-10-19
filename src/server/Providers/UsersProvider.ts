import { User } from  '../../lib/model';

const demoUser: User = {
  id: '1',
  name: 'Bob',
  login: 'bob',
};

export class UsersProvider
{
    // TODO: Established database connection (singleton proviver or UnitOfWork?).
    // TODO: Split logic between providers and services.
    // TODO: Standardize code.

    public static GetAll(): User[]
    {
        return [ demoUser ];
    }

    public static Get(Id: string): User
    {
        return demoUser;
    }
}