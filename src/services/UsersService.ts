import Service from "./Service";
import DAL from "../dal/DAL";

class UsersService implements Service {
    private userDal: DAL;

    constructor(userDal: DAL) {
         this.userDal = userDal
    }

    async getAll() {
        const users = await this.userDal.find();
        return users;
    }
}

export default UsersService;
