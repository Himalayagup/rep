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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoesUserExist = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const users_service_1 = require("../users.service");
let DoesUserExist = class DoesUserExist {
    constructor(userService) {
        this.userService = userService;
    }
    canActivate(context) {
        const ctx = graphql_1.GqlExecutionContext.create(context);
        const input = ctx.getArgs().createUserInput;
        const { email } = input;
        return this.validateRequest(email);
    }
    async validateRequest(email) {
        const userExist = await this.userService.findByEmail(email);
        if (userExist) {
            throw new common_1.ForbiddenException('Bad... This email already exist! Use different email');
        }
        return true;
    }
};
DoesUserExist = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], DoesUserExist);
exports.DoesUserExist = DoesUserExist;
//# sourceMappingURL=doesUserExist.guard.js.map