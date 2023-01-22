import DAL from './DAL';
import User from "../models/user";

const usersMock: User[] = [
    {
        id: 1,
        username: 'User1',
        uuid: '00000000-0000-0000-0000-000000000001',
    },
    {
        id: 2,
        username: 'User2',
        uuid: '00000000-0000-0000-0000-000000000002',
    }
]

class MockedUsersDal extends DAL {
    find(): User[] {
        return usersMock;
    }

    getByUuid(uuid: string) {
        return usersMock.filter((user) => user.uuid === uuid)[0];
    }
}

export default MockedUsersDal;
