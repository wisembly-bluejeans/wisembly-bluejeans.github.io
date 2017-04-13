
define(function (require) {

    var _                   = require('underscore');
    var Q                   = require('q');
    var $                   = require('jquery');

    var mockParams          = require("scripts/defaultRTCParams");
    var BJN                 = require("scripts/bjn-global");

    var localAudioStream = null;
    var localVideoStream = null;
    var RTCManager = null;
    var remoteVideoEl = null;

    var initialize = function(options) {

        remoteVideoEl   = options.remoteVideoEl;
        RTCManager      = BJN.RTCManager;

        //Add listeners for for RTCManager callbacks
        RTCManager.remoteEndPointStateChange    = onRemoteConnectionStateChange;
        RTCManager.localEndPointStateChange     = onLocalConnectionStateChange;
        RTCManager.remoteStreamChange           = onRemoteStreamUpdated;
        RTCManager.error                        = onRTCError;

    };

    var joinMeeting = function() {
        // Start the BJN meeting.
       /*
 	    var url = "https://10.5.7.149:4002/meeting/schedule";

        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            {
                console.log("Meeting Info ", xmlHttp.responseText)
                var resp = JSON.parse(xmlHttp.responseText);
                var meetingParams = {
                    numericMeetingId   : resp.numericMeetingId,
                    attendeePasscode    : resp.meetingPasscode,
                    displayName : "Test App"
                };
                RTCManager.startMeeting(meetingParams);
            }
            else 
            {
                console.log("Unable to get the meeting info");
            }
        }
        xmlHttp.open("GET", url, true); // true for asynchronous 
        xmlHttp.send(null); */

        var meetingParams = {
            numericMeetingId   : $('#id').val(),
            attendeePasscode    : $('#passCode').val(),
            displayName : "Test App"
        };
		
		console.log("*** Joining meeting id: " + meetingParams.numericMeetingId);

        RTCManager.startMeeting(meetingParams);
    };

    var onRemoteConnectionStateChange = function(state) {
        console.log('Remote Connection state :: ' + state);
    };

    var onLocalConnectionStateChange = function(state) {
       console.log('Local Connection state :: ' +  state);
    };

    var onRemoteStreamUpdated = function(stream) {
        BJN.remoteStream = stream;
        if (stream) {
            RTCManager.renderStream({
                stream: BJN.remoteStream,
                el: remoteVideoEl
            });
        }
    };
	
    // End the meeting
    var leaveMeeting = function(event) {
        RTCManager.endMeeting();
    };

    //Add code to handle error from BJN SDK
    var onRTCError = function(error) {
        console.log("Error has occured :: " + error);
        leaveMeeting();
    };

    return {
        initialize : initialize,
        joinMeeting : joinMeeting,
        leaveMeeting : leaveMeeting
    };

});
