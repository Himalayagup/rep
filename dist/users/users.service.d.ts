import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
export declare class UsersService {
    private readonly userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    create(createUserInput: CreateUserInput): Promise<User>;
    findAll(): Promise<Array<User>>;
    findById(id: number): Promise<User>;
    findByEmail(email: string): Promise<User>;
    update(id: number, updateUserInput: UpdateUserInput): Promise<User>;
    login(user: User): Promise<{
        access_token: Promise<string>;
    }>;
    validateUser(email: string, password: string): Promise<Partial<User>>;
    validateToken(token: string): Promise<User>;
}
