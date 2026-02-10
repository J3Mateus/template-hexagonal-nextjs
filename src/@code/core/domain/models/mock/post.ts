"use client";

import { DTO } from "@typing/http";
import { Model } from "../model";

class Post extends Model {
    private _userId: number;
    private _id: number;
    private _title: string;
    private _body: string;

    constructor() {
        super();
        this._userId = 0;
        this._id = 0;
        this._title = "";
        this._body = "";
    }

    // Getters and Setters
    get userId(): number {
        return this._userId;
    }

    set userId(value: number) {
        this._userId = value;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get body(): string {
        return this._body;
    }

    set body(value: string) {
        this._body = value;
    }

    static fromJSON(json: DTO): Post {
        const obj = new Post();
        obj._userId = Number(json["userId"]);
        obj._id = Number(json["id"]);
        obj._title = String(json["title"]);
        obj._body = String(json["body"]);
        return obj;
    }

    static fromJSONArray(jsonArray: DTO[]): Post[] {
        return jsonArray.map(json => Post.fromJSON(json));
    }

    toJSON(): DTO {
        const json = {} as DTO;
        json["userId"] = this._userId;
        json["id"] = this._id;
        json["title"] = this._title;
        json["body"] = this._body;
        return json;
    }

    static toJSONArray(posts: Post[]): DTO[] {
        return posts.map(post => post.toJSON());
    }
}

export default Post;
