export class LoginAccount {
    constructor(public id: number,
                public userId: number,
                public type: AccountType,
                public thirdParty: number,
                public identifier: string,
                public passwordToken: string) { }
}

export enum AccountType {
    phone,
    email
}
