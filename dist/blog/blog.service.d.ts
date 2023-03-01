import { Repository } from 'typeorm';
import { Blog } from './entities/blog.entity';
import { BlogInput } from './dto/create-blog.input';
export declare class BlogService {
    private blogRepository;
    constructor(blogRepository: Repository<Blog>);
    findAll(): Promise<Blog[]>;
    createBlog(blogInput: BlogInput): Promise<Blog>;
}
