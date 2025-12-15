import './style.css';

window.handleSetAttributes = async function () {
    const currentUser = window.insider.getCurrentUser();

    await currentUser.setName("Insider")
    await currentUser.setSurname("Demo")
    await currentUser.setAge(23)
    await currentUser.setGender("other")
    await currentUser.setBirthday(new Date())
    await currentUser.setEmailOptin(true)
    await currentUser.setSMSOptin(false)
    await currentUser.setPushOptin(true)
    await currentUser.setLocationOptin(true)
    await currentUser.setLanguage("TR")
    await currentUser.setLocale("tr_TR")
    await currentUser.setStringCustomAttribute("string_parameter", "Insider Example")
    await currentUser.setNumericCustomAttribute("int_parameter", 10)
    await currentUser.setNumericCustomAttribute("double_parameter", 10.5)
    await currentUser.setBooleanCustomAttribute("bool_parameter", true)
    await currentUser.setDateCustomAttribute("date_parameter", new Date())
    await currentUser.setArrayCustomAttribute("array_parameter", ["value1", "value2", "value3"]);

    console.log("[INSIDER][getCurrentUser]: Method is triggered.");
}


window.handleLogin = async function () {
    const identifiers = window.insider.createIdentifiers()
    identifiers.addEmail("mobile.test@useinsider.com");
    identifiers.addPhoneNumber("+909876543210");
    identifiers.addUserID("{crmID}");

    const currentUser = window.insider.getCurrentUser();
    const insiderId = await currentUser.login(identifiers);

    console.log("[INSIDER][login]: ", insiderId, identifiers);
}

window.handleLogout = async function () {
    const currentUser = window.insider.getCurrentUser();
    await currentUser.logout()

    console.log("[INSIDER][logout]: Method is triggered.");
}


window.handleTriggerEvents = async function () {
    // You can create an event without parameters and call the build method
    await window.insider.tagEvent("first_event").build()

    // You can create an event then add parameters and call the build method
    await window.insider.tagEvent("second_event")
        .addNumericParameter("int_parameter", 10)
        .build()

    // You can create an object and add the parameters later
    const insiderExampleEvent = window.insider.tagEvent("third_event")

    insiderExampleEvent
        .addStringParameter("string_parameter", "This is Insider.")
        .addNumericParameter("int_parameter", 10)
        .addNumericParameter("double_parameter", 10.5)
        .addBooleanParameter("bool_parameter", true)
        .addDateParameter("date_parameter", new Date());

    insiderExampleEvent.addStringArrayParameter("array_parameter", ["value1", "value2", "value3"]);

    // Do not forget to call build method once you are done with parameters.
    // Otherwise, your event will be ignored.
    console.log("Insider events triggered.");

    await insiderExampleEvent.build();

    console.log("[INSIDER][events] Insider events triggered.");
}


window.handleCreateProduct = async function () {
    const insiderExampleProduct = window.insider.createNewProduct(
        "productId",
        "productName",
        ["taxonomy1", "taxonomy2", "taxonomy3"],
        "imageURL",
        1000.5,
        "currency"
    );

    // Setting Product Attributes in chainable way.
    insiderExampleProduct
        .setColor("color")
        .setVoucherName("voucherName")
        .setVoucherDiscount(10.5)
        .setPromotionName("promotionName")
        .setPromotionDiscount(10.5)
        .setSize("size")
        .setSalePrice(10.5)
        .setShippingCost(10.5)
        .setQuantity(10)
        .setStock(10)
        .setGroupCode("12345");

    // Setting custom attributes.
    // MARK: Your attribute key should be all lowercased and should not include any special or non Latin characters or any space, otherwise this attribute will be ignored. You can use underscore _.
    insiderExampleProduct
        .setStringCustomAttribute("string_parameter", "This is Insider.")
        .setNumericCustomAttribute("int_parameter", 10)
        .setNumericCustomAttribute("double_parameter", 10.5)
        .setBooleanCustomAttribute("bool_parameter", true)
        .setDateCustomAttribute("date_parameter", new Date());

    insiderExampleProduct
        .setStringArrayCustomAttribute("array_parameter", ["value1", "value2", "value3"])
        .setNumericArrayCustomAttribute("array_parameter", [100, 3.14, 2]);

    console.log("[INSIDER][createNewProduct]: ", insiderExampleProduct);

    return insiderExampleProduct;
}


window.handleAddItemToCart = async function () {
    const insiderExampleProduct = await window.handleCreateProduct()
    await window.insider.itemAddedToCart(insiderExampleProduct);

    console.log("[INSIDER][itemAddedToCart]: Method is triggered.");
    console.log("[INSIDER][itemAddedToCart]: ", "product: ", insiderExampleProduct);
}

window.handleRemoveItemFromCart = async function () {
    const productId = "productId";
    await window.insider.itemRemovedFromCart(productId);

    console.log("[INSIDER][itemRemovedFromCart]: Method is triggered.");
    console.log("[INSIDER][itemRemovedFromCart]: ", "productId: ", productId);
}

window.handleClearCart = async function () {
    await window.insider.cartCleared();

    console.log("[INSIDER][cartCleared]: Method is triggered.");
}

window.handlePurchaseItem = async function () {
    const uniqueSaleId = 'uniqueSaleId';
    const insiderExampleProduct = await window.handleCreateProduct()

    await window.insider.itemPurchased(uniqueSaleId, insiderExampleProduct);

    console.log("[INSIDER][itemPurchased]: Method is triggered.");
    console.log("[INSIDER][itemPurchased]: ", "uniqueSaleID: " + uniqueSaleId);
}


window.handleGetSmartRecommenderData = async function () {
    // TODO: Not Supported for WebView SDK.
    console.log("[INSIDER]: This method is not supported for WebView SDK.");
}


window.handleTriggerSocialProof = async function () {
    // TODO: Not Supported for WebView SDK.
    console.log("[INSIDER]: This method is not supported for WebView SDK.");
}


window.handleHomePageVisit = async function () {
    await window.insider.visitHomePage()

    console.log("[INSIDER][visitHomePage]: Method is triggered.");
}

window.handleProductPageVisit = async function () {
    const insiderExampleProduct = await window.handleCreateProduct()
    await window.insider.visitProductDetailsPage(insiderExampleProduct)

    console.log("[INSIDER][visitProductDetailsPage]: Method is triggered.");
}

window.handleCartPageVisit = async function () {
    const insiderExampleProducts = [
        await window.handleCreateProduct(),
        await window.handleCreateProduct(),
    ];
    await window.insider.visitCartPage(insiderExampleProducts)

    console.log("[INSIDER][visitCartPage]: Method is triggered.");
}

window.handleCategoryPageVisit = async function () {
    const taxonomy = ["taxonomy1", "taxonomy2", "taxonomy3"];
    await window.insider.visitListingPage(taxonomy);

    console.log("[INSIDER][visitListingPage]: Method is triggered.");
}


window.handleGDPRTrue = async function () {
    await window.insider.setGDPRConsent(true);

    console.log(`[INSIDER][setGDPRConsent]: Method is triggered - true`);
}

window.handleGDPRFalse = async function () {
    await window.insider.setGDPRConsent(false);

    console.log(`[INSIDER][setGDPRConsent]: Method is triggered - false`);
}


window.handleMobileAccessTrue = async function () {
    await window.insider.setMobileAppAccess(true);

    console.log(`[INSIDER][setMobileAppAccess]: Method is triggered - true`);
}

window.handleMobileAccessFalse = async function () {
    await window.insider.setMobileAppAccess(false);

    console.log(`[INSIDER][setMobileAppAccess]: Method is triggered - false`);
}


window.handleGetMessageCenterData = async function () {
    // You can see push campaigns in the last 90 days
    const startDate = new Date(Date.now() - 86400000);
    const endDate = new Date(Date.now() + 86400000);

    console.log("[INSIDER][getMessageCenterData]: Method is triggered, waiting response.");

    try {
        const data = await window.insider.getMessageCenterData(startDate, endDate, 100);
        console.log("[INSIDER][getMessageCenterData]: ", data);
    } catch (error) {
        console.log("[INSIDER][getMessageCenterData]: ", "error: ", error);
    }
}


window.handleGetContentOptimizerVariable = async function () {
    // TODO: Not Supported for WebView SDK.
    console.log("[INSIDER]: This method is not supported for WebView SDK.");
}


window.handleDisableInAppMessages = async function () {
    await window.insider.disableInAppMessages()

    console.log(`[INSIDER][disableInAppMessages]: Method is triggered.`);
}

window.handleEnableInAppMessages = async function () {
    await window.insider.enableInAppMessages()

    console.log(`[INSIDER][enableInAppMessages]: Method is triggered.`);
}
