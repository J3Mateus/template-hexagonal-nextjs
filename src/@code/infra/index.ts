"use client";

import { AxiosInstance } from "axios";
import { BackendClient } from "./api/clients";

abstract class BaseAPI {
	constructor(private _client: AxiosInstance = BackendClient) {}

	get client() {
		return this._client;
	}
}

export default BaseAPI;