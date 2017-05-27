var Router = function () {
    var self = this;
    this.callbacks = [];
    this.routes = {};
    this.usePushState = !!(window.history && window.history.pushState); 
    document.addEventListener("popstate", self.navigate);
    this._setupEvents();
};

Router.prototype._setupEvents = function () {
    var self = this;
    var elems = document.getElementsByTagName("a");
    console.log("elems: ", elems);
    Array.prototype.slice.call(elems).forEach(function (e, i) {
       e.addEventListener("click", function (e) {
            e.preventDefault();
            console.log("CLCIKCED: ", e.target.pathname);
            self.navigate(e.target.pathname);
       });
    });
   
  }

Router.prototype.map = function (callback) {
    callback.call(this);
}

Router.prototype.route = function (routeName, options) {
    this.routes[routeName] = options;
}

Router.prototype.navigate = function (path) {
    if (this.usePushState) {
        window.history.pushState({}, null, path);
    } else {
         // IF THE URL is absolute make it relative
        path = path.replace(/(\/\/|[^\/])*/, "")
        window.location.hash = "#" + path
    }

    this.load();
}

Router.prototype.load = function () {
    if (this.usePushState) {
        var url = location.pathname;
    } else {
        var url = location.hash.slice(1) || "/";
    }
    var routeName = url.replace("/", "");
    console.log("url: ", url, routeName,this.routes);

    var handler = this.routes[routeName];
    console.log("handler: ", handler);
}