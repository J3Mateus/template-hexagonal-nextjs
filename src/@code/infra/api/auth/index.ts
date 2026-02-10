import AuthAdapter from "@interfaces/adapters/AuthAdapter";
import BaseAPI from "../../index";

class AuthAPI extends BaseAPI implements AuthAdapter {

	saveAuthorization(token: string): void {
		this.client.defaults.headers.common[
			"Authorization"
		] = `Bearer ${token}`;
	}

	clearAuthorization(): void {
		delete this.client.defaults.headers.common["Authorization"];
	}
}
export default AuthAPI;
