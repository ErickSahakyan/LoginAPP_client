export interface IUser {
    user: any;
    _id: {
        $oid: string
    },
    name: string,
    surname: string,
    email: string,
    password: string,
}