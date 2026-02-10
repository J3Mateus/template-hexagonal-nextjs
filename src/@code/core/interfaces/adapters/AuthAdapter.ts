export default abstract class AuthAdapter {
	abstract saveAuthorization(token: string): void;
	abstract clearAuthorization(): void;
}