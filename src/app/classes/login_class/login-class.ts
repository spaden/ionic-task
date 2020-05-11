export class LoginClass {
    userId: number;
    password: string;
    superUserId: number;
    superUserCheck: boolean;
    userLogin(
        userId: number,
        password: string
    ) {
        this.userId = userId;
        this.password = password;
        this.superUserCheck = false;
    }

    superUserLogin(
        userId: number,
        superUserId: number,
        superUserPassword: string
    ) {
        this.userId = userId;
        this.superUserId = superUserId;
        this.password = superUserPassword;
        this.superUserCheck = true;
    }
}
