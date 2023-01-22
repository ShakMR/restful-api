import DAL from './DAL';

const usersMock = [
    {
        username: 'User1'
    },
    {
        username: 'User2'
    }
]

class MockedUsersDal extends DAL {
    async find() {
        return usersMock;
    }
}

export default MockedUsersDal;
