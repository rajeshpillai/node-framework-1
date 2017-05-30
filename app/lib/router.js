var Router = function () {
    var self = this;
    this.routes = {};
    this.usePushState = !!(window.history && window.history.pushState); 
    this._setupEvents();
    this.start();
};

Router.prototype._setupEvents = function () {
    var self = this;
    // Click handler on anchor tags
    document.addEventListener("click", function (e) {
        e.preventDefault();
        console.log(e);
        if (e.target.tagName == 'A') {
            self.navigate(e.target.pathname);
        }
    });
}

Router.prototype.start = function () {
    var self = this;
    if (self.usePushState) {
        $(window).on("popstate", self.load.bind(self));
    } else{
        $(window).on("hashchange", self.load.bind(self));
    }
}

Router.prototype.map = function (callback) {
    callback.call(this);
}

Router.prototype.route = function (routeName, options) {
    var path = options.path.replace(/:\w+/g,'([^/?]+)');
    options.regex  = new RegExp("^" + path + "$");
    this.routes[routeName] = new Route(options);
}

Router.prototype.navigate = function (path) {
    var self = this;
    console.log(`Navigating to ${path}`);
    if (self.usePushState) {
        window.history.pushState({}, null, path);
    } else {
         // IF THE URL is absolute make it relative
        path = path.replace(/(\/\/|[^\/])*/, "")
        window.location.hash = "#" + path
    }

    self.load();
}

Router.prototype.load = function () {
    var self = this;
    console.log("PUSH STATE: ", self.usePushState);
    if (self.usePushState) {
        var url = location.pathname;
    } else {
        console.log("POP: ISSUE");
        var url = location.hash.slice(1) || "/";
    }
    var routeName = url.replace("/", "");


    var baseNameArray = routeName.split('/');
    var baseRouteName = baseNameArray[0];
    console.log("routeParts: ",url, baseNameArray, baseRouteName);
    
    //var handler = this.routes[baseRouteName];
    //loop through and get the match based on path

    var handler = null;    
    for(var obj in this.routes) {
        var route = self.routes[obj];
        console.log(`matching ${url} to ${route.options.regex}`);
        if (url.match(route.options.regex)) {
            handler = route;
            break;
        }
    }

    console.log("found handler: ", handler);
    console.log("url: ", url, routeName,self.routes, handler);

    if (baseRouteName == "") {
        window.location = "/";
        return;
    }
    //: REFACTOR
    require(`/routes/${baseRouteName}.js`, function () {
        render(baseRouteName, {qs: baseNameArray[1]});
    });
}

Router.prototype.transitionTo = function (routeName) {
    this.navigate(routeName);
}