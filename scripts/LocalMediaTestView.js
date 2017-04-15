
define(function (require) {

    var _       			= require('underscore');
    var Q 					= require('q');
    var $					= require('jquery');

    var defaultRTCParams 	= require("scripts/defaultRTCParams");
    var BJN 				= require("scripts/bjn-global");
	var oldVol;
    var timer;
    var config = {
        muteParams: {
            localAudio: false,
            localVideo: false
        }
	};

    var mediaConstraints=  {
        audio:{
            optional:[],
            mandatory:[]
        },
        video:{
            optional:[{ minWidth: 1280 }, { minHeight: 720 }],
            mandatory:[]
        }
    };

    var initialize = function(options) {
        localVideoEl = options.localVideoEl;
        remoteVideoEl = options.remoteVideoEl;
        RTCManager = BJN.RTCManager;
        updateButtonStates();
        getAvailableDevices();
        startLocalStream();
        RTCManager.localVideoStreamChange = updateSelfView;
		RTCManager.localAudioStreamChange = updateAudioPath;
        //timer = setInterval(setVolume,1000);
     };

        //Get the local A/V stream, this stream will be used to for the webrtc connection
        // stream is an array of stream
        // stream[0] - local audio stream
        // stream[1] - local video stream

    var startLocalStream = function() {
        RTCManager.getLocalMedia(mediaConstraints, 'local_stream').then(function(stream) {
            console.log("getLocalMedia promise resolved");
            BJN.localAudioStream = stream[0];
            BJN.localVideoStream = stream[1];
            //updateSelfView(BJN.localVideoStream);
            $(".controls").removeAttr("disabled");
        });
    };

        //Callback for local video stream change, it can be used to render self view when the stream is available
    var updateSelfView = function (localStream) {
        if(localStream) {
			updateVideoMuteButton(false);
			RTCManager.renderSelfView({
                 stream: localStream,
                 el: localVideoEl
             });
         }
    };
	
	// Callback when audio stream changes.  update GUI if stream is defined	
	var updateAudioPath = function (localStream) {
		if(localStream) {
			updateAudioMuteButton(false);
		}
	};

        //Get the list of all available devices. it returns a list of devices. Use the list for device selection
    var getAvailableDevices = function() {
        RTCManager.getLocalDevices().then(function(devices) {
            console.log("Got local devices :: " + JSON.stringify(devices));
            handleDeviceChange(devices.available);
        }, function(error) {
            console.log("Local device error " + error);
        });
    };

        //List available devices to the user and changes the device based on selecetion.
        // Note :: Device can not be changes once call is started.
        // To change the self view for every device change, stop the current local_stream and
        // get the new stream based on the new devices.

    var handleDeviceChange = function(devices) {
        BJN.localDevices = devices;
        // Add audio in devices to the selecetion list
        devices.audioIn.forEach( function(device) {
            $('#audioIn').append('<option>' + device.label +'</option>');
        });
        devices.audioOut.forEach(function(device) {
            $('#audioOut').append('<option>' + device.label +'</option>');
        });
        devices.videoIn.forEach(function(device) {
            $('#videoIn').append('<option>' + device.label +'</option>');
        });

            //handle the devicel seletion changes and update the local stream.

        $("#audioIn").change( function() {
            console.log("value is changed " + BJN.localDevices.audioIn[$("#audioIn").prop('selectedIndex')].id );
                mediaConstraints.audio.optional.push(
                { sourceId: BJN.localDevices.audioIn[$("#audioIn").prop('selectedIndex')].id });
                BJN.RTCManager.stopLocalStreams();
                startLocalStream();
        });

        $("#videoIn").change( function() {
            console.log("value is changed " + BJN.localDevices.audioIn[$("#videoIn").prop('selectedIndex')].id);
                mediaConstraints.video.optional.push(
                { sourceId: BJN.localDevices.audioIn[$("#videoIn").prop('selectedIndex')].id });
                BJN.RTCManager.stopLocalStreams();
                startLocalStream();
        });

        $("#audioOut").change( function() {
            console.log("value is changed " + BJN.localDevices.audioIn[$("#audioOut").prop('selectedIndex')].id);
            BJN.RTCManager.setSpeaker({ speakerId : BJN.localDevices.audioIn[$("#audioOut").prop('selectedIndex')].id,
                                        mediaElements: remoteVideoEl});
        });
    };

        /* ============================= */
        /*      Test Mute Controls   	 */
        /* ============================= */

	var toggleAudioMute = function(event) {
		var audioMuted = config.muteParams.localAudio ? true : false;
		config.muteParams.localAudio = !audioMuted;
		audioMuted ? unmuteAudio() : muteAudio();

	};

	var muteAudio = function() {
		RTCManager.muteStreams(config.muteParams);
		updateAudioMuteButton(true);
	};

	var unmuteAudio = function() {
		RTCManager.muteStreams(config.muteParams);
		updateAudioMuteButton(false);
	};

	var toggleVideoMute = function(event) {
		var videoMuted = config.muteParams.localVideo ? true : false;
		config.muteParams.localVideo = !videoMuted;
		videoMuted ? unmuteVideo() : muteVideo();
	};

	var muteVideo = function() {
		RTCManager.muteStreams(config.muteParams);
		updateVideoMuteButton(true);
	};

	var unmuteVideo = function() {
		RTCManager.muteStreams(config.muteParams);
		// let video stream event set button state
	};

	var updateButtonStates = function() {
		var locals = RTCManager.getCurrentMuteStates('local');
		var muted = locals.audio ? true : false;
		updateAudioMuteButton(muted);

		muted = locals.video ? true : false;
		updateVideoMuteButton(muted);
	};

	var setVolume = function(){
        var vol = RTCManager.getMicrophoneVolume();
		if(oldVol!==vol){
			$('#volume').val(vol);
			oldVol = vol;
		}
	}
	var updateAudioMuteButton = function(muted) {
		var updatedText = muted ? "Unmute Audio" : "Mute Audio";
		$("#toggleAudioMute").html(updatedText);
		console.log(muted ? "Audio is Muted now" : "Audio is Unmuted now");
	};

	var updateVideoMuteButton = function(muted) {
		var updatedText = muted ? "Show Video" : "Mute Video";
		$("#toggleVideoMute").html(updatedText);
		console.log(muted ? "Video is Muted now" : "Video is Unmuted now");
	};

	return {
	initialize : initialize,
	toggleVideoMute : toggleVideoMute,
	toggleAudioMute : toggleAudioMute

	};

});


