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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const blog_entity_1 = require("./entities/blog.entity");
const blog_service_1 = require("./blog.service");
const create_blog_input_1 = require("./dto/create-blog.input");
const graphql_2 = require("@nestjs/graphql");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const pubSub = new graphql_subscriptions_1.PubSub();
let BlogResolver = class BlogResolver {
    constructor(blogService) {
        this.blogService = blogService;
    }
    async findAll() {
        return this.blogService.findAll();
    }
    createBlog(blogInput) {
        pubSub.publish('blogPostAdded', { blogPostAdded: blogInput });
        return this.blogService.createBlog(blogInput);
    }
    blogPostAdded() {
        return pubSub.asyncIterator('blogPostAdded');
    }
};
__decorate([
    (0, graphql_2.Query)((type) => [blog_entity_1.Blog], { name: 'blogs' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BlogResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_2.Mutation)((returns) => blog_entity_1.Blog),
    __param(0, (0, graphql_2.Args)('blogInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_blog_input_1.BlogInput]),
    __metadata("design:returntype", Promise)
], BlogResolver.prototype, "createBlog", null);
__decorate([
    (0, graphql_2.Subscription)(() => blog_entity_1.Blog),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BlogResolver.prototype, "blogPostAdded", null);
BlogResolver = __decorate([
    (0, graphql_1.Resolver)((of) => blog_entity_1.Blog),
    __metadata("design:paramtypes", [blog_service_1.BlogService])
], BlogResolver);
exports.BlogResolver = BlogResolver;
//# sourceMappingURL=blog.resolver.js.map