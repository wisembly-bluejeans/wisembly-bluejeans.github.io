define([
	"jquery",
	"underscore",

    "WebRTC_SDK/RTCManager",

    // Sample App src files
    "scripts/defaultRTCParams",
    "scripts/bjn-global",
    "scripts/LocalMediaTestView",
    "scripts/JoinMeetingTestView"

], function($, _, RTCManager, defaultRTCParams, BJN, LocalMediaTestView, JoinMeetingTestView) {

    console.log("main.js loaded, the fun begins now!!");

    $(".controls").attr("disabled", "disabled");

    // Initiate BJN SDK, refer defaultRTCParams.js and change the diff values as per need.
    // Add timeout values
    BJN.RTCManager = new RTCManager({
                webrtcParams: defaultRTCParams,
                bjnCloudTimeout : 5000,
                bjnSIPTimeout : 3000,
                bjnWebRTCReconnectTimeout : 90000});

	
	LocalMediaTestView.initialize({
		el: "#localMediaControls",
        localVideoEl: $("#localVideo")[0]
	});
	
	 $("#toggleAudioMute").click(function() {
        LocalMediaTestView.toggleAudioMute();
    });

    $("#toggleVideoMute").click(function() {
        LocalMediaTestView.toggleVideoMute();
    });

    JoinMeetingTestView.initialize({
        el: "#joinMeetingControls",
        remoteVideoEl: $("#remoteVideo")[0],
    });

    $("#joinMeeting").click(function() {
        JoinMeetingTestView.joinMeeting();
    });

    $("#leaveMeeting").click(function() {
        JoinMeetingTestView.leaveMeeting();
    });

});
