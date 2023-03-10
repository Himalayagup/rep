"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const apollo_1 = require("@nestjs/apollo");
const typeorm_1 = require("@nestjs/typeorm");
const graphql_1 = require("@nestjs/graphql");
const users_module_1 = require("./users/users.module");
const user_entity_1 = require("./users/entities/user.entity");
const users_resolver_1 = require("./users/users.resolver");
const users_service_1 = require("./users/users.service");
const path_1 = require("path");
const blog_module_1 = require("./blog/blog.module");
const blog_resolver_1 = require("./blog/blog.resolver");
const blog_service_1 = require("./blog/blog.service");
const blog_entity_1 = require("./blog/entities/blog.entity");
const jwt_1 = require("@nestjs/jwt");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: 'user@postgres',
                database: 'rep_test2',
                entities: [user_entity_1.User, blog_entity_1.Blog],
                synchronize: true,
            }),
            typeorm_1.TypeOrmModule.forFeature([blog_entity_1.Blog, user_entity_1.User]),
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: (0, path_1.join)(process.cwd(), 'src/schema.gql'),
            }),
            blog_module_1.BlogModule,
            users_module_1.UsersModule,
            jwt_1.JwtModule.register({
                secret: 'jwtSecret',
                signOptions: { expiresIn: '24h' },
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, users_service_1.UsersService, users_resolver_1.UsersResolver, blog_service_1.BlogService, blog_resolver_1.BlogResolver],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map