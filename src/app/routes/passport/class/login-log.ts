export class LoginLog {

    constructor(public userId: number,
                public loginDate: number,
                public deadDate: number,
                public identifier: string,
                public logout: boolean) { }
}
