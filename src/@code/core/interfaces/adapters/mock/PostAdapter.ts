import Post from "@models/mock/post";

abstract class PostAdapter {
    abstract fetch(): Promise<Post[]>;
}

export default PostAdapter;