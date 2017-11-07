# WebRTC Client SDK
## Release Notes:  ver 1.0.3
### Oct 2017,  Glenn Inn,  Technical Lead API & Partnerships

![BlueJeans](./media/927.png)



Document Date: 2017-10-13

| Version | Date       | Who  | Description                              |
| ------- | ---------- | ---- | ---------------------------------------- |
| 1.0.3   | 11/07/2017 | g1   | Update webrtcsdk.min.js to fix Chrome on Andoid |
| 1.0.2   | 10/23/2017 | g1   | Add link to Network Configuration for WebRTC |
| 1.0.1   | 10/13/2017 | g1   | Upgrade webrtcclientsdk.js to be compatible |
|         |            |      | with Firefox browsers                    |
|         |            |      | and patch for pre-call media request     |
| 1.0.0   | 10/12/2017 | g1   | Upgrade backend webrtc-sdk.js with Firefox |
|         |            |      | and patch for pre-call media request     |
| 0.9.0   | 4/27/2017  | g1   | Initial Checkin of Client SDK doc        |
| 0.9.1   | 5/2/2017   | g1   | Clean-up typos.  Add revs to S/W modules |
| 0.9.2   | 5/17/2017  | g1   | Update project with Corporate styling.  Adjust required build files |



## In This Release

The 1.0.3 version fixes the defect that prevented WebRTC from running on Chrome / Android.

The 1.0.2 release included a link to BlueJeans support site reference for network configuration to support WebRTC calling.  Support for WebRTC on Chrome running on Android is broken in this release. Firefox and Chrome on Windows and Mac are working as expected.

The 1.0.1 release contains all the WebRTC components to support both Chrome and Firefox browsers. These involved both back-end (webrtcsdk.min.js) as well as client-facing (webrtcclientsdk.js) files.  Additionally, these changes are included/exposed:

1. BlueJeans' RTCClient functions are exposed via the BJN.RTCClient object; they may be called by other application Javascript and frameworks.
   - example:  BJN.RTCClient.initialize();
2. The basic BlueJeans' client function endpoints available to applications are listed here.  Refer to the documentation provided in the README file for more detailed information:
   1. initialize()
   2. setVideoBandwidth()
   3. joinMeeting()
   4. leaveMeeting()
   5. toggleVideoMute()
   6. toggleAudioMute()
   7. changeAudioInput()  - (May require information not currently exposed in this release)
   8. changeAudioOutput()  - (May require information not currently exposed in this release)
   9. changeVideoInput()  - (May require information not currently exposed in this release)
3. As provided in this reference application, BlueJeans delivers a video feed sized for 1024 x 768.  If the HTML web page needs to change the dimensions (4:3) it should use the CSS `transform: scale (xscale,yscale);`  operation on the <video> element.



### Known Limitations

1. **Single Meeting Session** SDK is limited to support connection to one, and only one BlueJeans meeting per page refresh.  If the application needs to join a follow-on meeting, the web page and BlueJeans WebRTC Framework must be reloaded (refresh page).  This limitation will be addressed in a future release.







