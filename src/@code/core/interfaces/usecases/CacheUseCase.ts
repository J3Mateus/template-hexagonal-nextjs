export default abstract class CacheUseCase {

	getToken(): string | undefined {
		throw new Error('you must implement "getAccountToken"');
	}

	saveAssistantID(_: string): void {
		throw new Error('you must implement "saveAssistantID"');
	}

    getAssistantID(): string | undefined {
		throw new Error('you must implement "getAccountToken"');
	}

	clearAssistant(): void {
		throw new Error('you must implement "clearAssistant"');
	}
}