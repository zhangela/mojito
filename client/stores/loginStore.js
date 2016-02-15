const loginStoreData = new ReactiveDict("loginStoreData");

loginStore = {
    openModal({
        successCallback,
        cancelCallback,
        loginReason
    }) {
        loginStoreData.set("modalOpen", true);

    },

    getModalState() {
        return {
            "modalOpen": loginStoreData.get("modalOpen")
        };
    },

    hideModal() {
        loginStoreData.set("modalOpen", false);
    }
};
