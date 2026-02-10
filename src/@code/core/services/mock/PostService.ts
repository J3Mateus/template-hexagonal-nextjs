import PostAdapter from '@interfaces/adapters/mock/PostAdapter';
import PostUseCase from "@interfaces/usecases/mock/PostUseCase";
import Post from "@models/mock/post";

class PostService implements PostUseCase {
    constructor(protected readonly adapter: PostAdapter) { }
    async fetch(): Promise<Post[]> {
       return await this.adapter.fetch()
    }

}

export default PostService;