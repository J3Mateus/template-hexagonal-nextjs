import AuthService from "@services/AuthService";
import CacheService from "@services/CacheService";
import MockService from "@services/mock/PostService";
import AuthAPI from "@api/auth";
import MockAPI from "@api/mock";
class NextDIContainer {
	static getCacheUsecase() {
		return new CacheService();
	}

	static getAuthUseCase() {
		return new AuthService(
			new AuthAPI(),
			NextDIContainer.getCacheUsecase()
		);
	}
	static getMockUseCase() {
		return new MockService(
			new MockAPI()
		);
	}
}

export { NextDIContainer };