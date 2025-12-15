import { InsiderProduct } from "./InsiderWebViewScript";

declare global {
    interface Window {
        handleSetAttributes: () => Promise<void>;

        handleLogin: () => Promise<void>;
        handleLogout: () => Promise<void>;

        handleTriggerEvents: () => Promise<void>;

        handleCreateProduct: () => Promise<InsiderProduct>;

        handleAddItemToCart: () => Promise<void>;
        handleRemoveItemFromCart: () => Promise<void>;
        handleClearCart: () => Promise<void>;
        handlePurchaseItem: () => Promise<void>;

        handleGetSmartRecommenderData: () => Promise<void>;

        handleTriggerSocialProof: () => Promise<void>;

        handleHomePageVisit: () => Promise<void>;
        handleProductPageVisit: () => Promise<void>;
        handleCartPageVisit: () => Promise<void>;
        handleCategoryPageVisit: () => Promise<void>;

        handleGDPRTrue: () => Promise<void>;
        handleGDPRFalse: () => Promise<void>;

        handleMobileAccessTrue: () => Promise<void>;
        handleMobileAccessFalse: () => Promise<void>;

        handleGetMessageCenterData: () => Promise<void>;

        handleGetContentOptimizerVariable: () => Promise<void>;

        handleDisableInAppMessages: () => Promise<void>;
        handleEnableInAppMessages: () => Promise<void>;
    }
}

export {};
