Package.describe({
    version: "0.14.4"
});

Package.onUse(function (api) {
    api.use("modules");
    api.addFiles('get-react-from-npm.js');
    api.export('React');
    api.export('ReactDOM');
});