"use client";

import PostAdapter from "@interfaces/adapters/mock/PostAdapter";
import BaseAPI from "../../index";
import Post from "@models/mock/post";


class PostAPI extends BaseAPI implements PostAdapter {
	async fetch(): Promise<Post[]> {
		const response = await this.client.get('/posts');
		return Post.fromJSONArray(response.data)
	}

}

export default PostAPI;