export enum Entity {
    users= 'users',
}
export type APIConfig = {
    prefix: Record<Entity, string>
}

export type Config = {
    api: APIConfig
};

const config: Config = {
    api: {
        prefix: {
            users: "/users"
        }
    }
};

export default config;
