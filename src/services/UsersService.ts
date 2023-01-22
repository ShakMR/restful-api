import Service from "./Service";
import DAL from "../dal/DAL";
import User from "../models/user";

class UsersService implements Service {
    private userDal: DAL;

    constructor(userDal: DAL) {
         this.userDal = userDal
    }

    async getAll() {
        return this.userDal.find();
    }

    async getByUuid(id: string) {
        return await this.userDal.getByUuid(id);
    }
}

export default UsersService;
