import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
export declare class UsersResolver {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(createUserInput: CreateUserInput): Promise<User>;
    findAll(): Promise<User[]>;
    updateUser(updateUserInput: UpdateUserInput): Promise<User>;
    login(email: string, password: string, context: any): Promise<Partial<User>>;
    logout(context: any): Promise<boolean>;
}
