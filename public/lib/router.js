var Router = function () {
    this.callbacks = [];
    this.routes = {};
};

Router.prototype.map = function (callback) {
    //this.callbacks.push(callback);
    callback.call(this);
}

Router.prototype.route = function (routeName, options) {
    this.routes[routeName] = options;
}