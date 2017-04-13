requirejs.config({
    baseUrl: '',

    paths: {
       "webrtc-sdk" : "./external/webrtcsdk",
       jquery: './external/jquery',
       underscore: './external/lodash'
    }
});

require(["webrtc-sdk"], function () {
    console.log("sdk loaded, all is fine until now!!");
    require(['main'], function() {
        console.log("main.js loaded, all is fine until now!!");
    });
});
