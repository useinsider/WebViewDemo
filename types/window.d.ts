import { InsiderProduct } from "./InsiderWebViewScript";

declare global {
    interface Window {
        handleSetAttributes: () => Promise<void>;

        handleSignUp: () => Promise<void>;
        handleLogin: () => Promise<void>;
        handleLogout: () => Promise<void>;

        handleTriggerEvents: () => Promise<void>;

        handleCreateProduct: () => Promise<InsiderProduct>;

        handleAddItemToCart: () => Promise<void>;
        handleRemoveItemFromCart: () => Promise<void>;
        handleClearCart: () => Promise<void>;
        handlePurchaseItem: () => Promise<void>;

        handleAddItemToWishlist: () => Promise<void>;
        handleRemoveItemFromWishlist: () => Promise<void>;
        handleVisitWishlist: () => Promise<void>;
        handleClearWishlist: () => Promise<void>;

        handleHomePageVisit: () => Promise<void>;
        handleProductPageVisit: () => Promise<void>;
        handleCartPageVisit: () => Promise<void>;
        handleCategoryPageVisit: () => Promise<void>;

        handleGDPRTrue: () => Promise<void>;
        handleGDPRFalse: () => Promise<void>;

        handleMobileAccessTrue: () => Promise<void>;
        handleMobileAccessFalse: () => Promise<void>;

        handleGetMessageCenterData: () => Promise<void>;

        handleDisableInAppMessages: () => Promise<void>;
        handleEnableInAppMessages: () => Promise<void>;
    }
}

export {};
