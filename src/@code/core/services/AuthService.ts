import AuthUseCase from "@interfaces/usecases/AuthUseCase";
import AuthAdapter from "@interfaces/adapters/AuthAdapter";
import CacheUseCase from "@interfaces/usecases/CacheUseCase";

class AuthService implements AuthUseCase {
	constructor(
		protected readonly adapter: AuthAdapter,
		protected readonly cacheUsecase: CacheUseCase
	) {
		const token = cacheUsecase.getToken();
		if (token) {
			this.adapter.saveAuthorization(token);
		}
	}

	saveAuthorization(token: string): void {
		this.adapter.saveAuthorization(token);
	}

	clearCachedAccount(): void {
		this.adapter.clearAuthorization();
	}
}

export default AuthService;