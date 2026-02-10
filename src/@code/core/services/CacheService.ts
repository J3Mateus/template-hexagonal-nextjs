import StorageController from "@cache/storage/StorageController";
import CacheUseCase from "@interfaces/usecases/CacheUseCase";

class CacheService implements CacheUseCase {
    getToken(): string | undefined {
        return 'Teste com token'
    }
    getAssistantID(): string | undefined {
        return StorageController.get("assistantID");
    }
    saveAssistantID(assistantID: string): void {
        StorageController.set("assistantID", assistantID);
    }
    clearAssistant(): void {
        StorageController.removeAssistantID();
    }

}

export default CacheService;
