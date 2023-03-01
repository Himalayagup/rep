"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./entities/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let UsersService = class UsersService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async create(createUserInput) {
        const user = this.userRepository.create(createUserInput);
        return await this.userRepository.save(user);
    }
    async findAll() {
        return await this.userRepository.find();
    }
    async findById(id) {
        return await this.userRepository.findOne({ where: { id } });
    }
    async findByEmail(email) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new common_1.NotFoundException(`User #${email} not found`);
        }
        return user;
    }
    async update(id, updateUserInput) {
        const user = await this.userRepository.preload(Object.assign({ id: id }, updateUserInput));
        if (!user) {
            throw new common_1.NotFoundException(`User #${id} not found`);
        }
        return this.userRepository.save(user);
    }
    async login(user) {
        const payload = { sub: user.id };
        const access_token = this.jwtService.signAsync(payload);
        return {
            access_token: access_token,
        };
    }
    async validateUser(email, password) {
        const user = await this.findByEmail(email);
        if (user && bcrypt.compareSync(password, user.password)) {
            const { password } = user, result = __rest(user, ["password"]);
            const token = await this.login(user);
            const newResult = Object.assign(Object.assign({}, result), token);
            return newResult;
        }
        return null;
    }
    async validateToken(token) {
        try {
            const decoded = this.jwtService.verify(token);
            const user = await this.findById(decoded.sub);
            if (!user) {
                throw new Error('Invalid token');
            }
            return user;
        }
        catch (error) {
            throw new Error('Invalid token');
        }
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map