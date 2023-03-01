import { Blog } from './entities/blog.entity';
import { BlogService } from './blog.service';
import { BlogInput } from './dto/create-blog.input';
export declare class BlogResolver {
    private blogService;
    constructor(blogService: BlogService);
    findAll(): Promise<Blog[]>;
    createBlog(blogInput: BlogInput): Promise<Blog>;
    blogPostAdded(): AsyncIterator<unknown, any, undefined>;
}
