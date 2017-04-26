requirejs.config({
    baseUrl: '',

    paths: {
       "webrtc-sdk" : "./external/webrtcsdk",
       jquery: './external/jquery',
       underscore: './external/lodash'
    }
});

require(["webrtc-sdk"], function () {
    console.log("(require): webrtc sdk loaded");
    require(['example'], function() {
        console.log("(require): example bjnrtcsdk app loaded");
    });
});
