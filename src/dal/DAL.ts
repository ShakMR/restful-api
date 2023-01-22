abstract class DAL {
    abstract find();

    abstract getByUuid(uuid: string);
}

export default DAL;
