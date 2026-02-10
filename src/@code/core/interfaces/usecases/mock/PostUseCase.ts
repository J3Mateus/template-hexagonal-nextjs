import Post from "@models/mock/post";

abstract class PostUseCase {
    abstract fetch(): Promise<Post[]>;
}

export default PostUseCase;