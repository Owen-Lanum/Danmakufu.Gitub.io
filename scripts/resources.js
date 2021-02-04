//https://github.com/jlongster/canvas-game-bootstrap/tree/a878158f39a91b19725f726675c752683c9e1c08
(function() {
    window.Danmakufu = window.Danmakufu || {};
    window.Danmakufu.Resources = {};  //new namespace

    var resourceCache = Danmakufu.Resources.resourceCache = {};
    var loading = Danmakufu.Resources.loading = [];
    var readyCallbacks = Danmakufu.Resources.readyCallbacks = [];

    // Load an image url or an array of image urls
    var load = Danmakufu.Resources.load = function (urlOrArr) {
        if(urlOrArr instanceof Array) {
            urlOrArr.forEach(function(url) {
                _load(url);
            });
        }
        else {
            _load(urlOrArr);
        }
    };

    var _load = Danmakufu.Resources._load = function (url) {
        if(resourceCache[url]) {
            return resourceCache[url];
        }
        else {
            var img = new Image();
            img.onload = function() {
                resourceCache[url] = img;

                if(isReady()) {
                    readyCallbacks.forEach(function(func) { func(); });
                }
            };
            resourceCache[url] = false;
            img.src = url;
        }
    };

    var get = Danmakufu.Resources.get = function (url) {
        return resourceCache[url];
    };

    var isReady = Danmakufu.Resources.isReady = function () {
        var ready = true;
        for(var k in resourceCache) {
            if(resourceCache.hasOwnProperty(k) &&
               !resourceCache[k]) {
                ready = false;
            }
        }
        return ready;
    };

    var onReady = Danmakufu.Resources.onReady = function (func) {
        readyCallbacks.push(func);
    };


})();
