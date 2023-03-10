export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    hashPassword(): Promise<void>;
    checkPassword(password: string): Promise<any>;
}
