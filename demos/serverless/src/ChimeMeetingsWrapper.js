// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

const AWS = require('aws-sdk');

module.exports = class ChimeMeetingsWrapper {

    // Create an AWS SDK Chime object. Region 'us-east-1' is currently required.
    // Use the MediaRegion property below in CreateMeeting to select the region
    // the meeting is hosted in.
    

    constructor(currentRegion, controlRegion, endpoint){
        console.log("const controlRegion",controlRegion);
        this.chime = new AWS.Chime({ region: currentRegion });

        // Set the AWS SDK Chime endpoint. The global endpoint is https://service.chime.aws.amazon.com
        this.chime.endpoint = new AWS.Endpoint(endpoint);
        this.controlRegion = (!!controlRegion) ? currentRegion : controlRegion;
        console.log("Const this.controlRegion",this.controlRegion);
        this.chimeMeetings = new AWS.ChimeSDKMeetings({ region: this.controlRegion});
    }

    getChimeInstance(glabal){
        return global ? this.chime : this.chimeMeetings;
    }

    createMeeting(global, request){
        console.log("Create Meeting");
        return (global) ? this.chime.createMeeting(request) : this.chimeMeetings.createMeeting(request);
    }

    createAttendee(global, request){
        console.log("Create Attendee");
        return (global) ? this.chime.createAttendee(request) : this.chimeMeetings.createAttendee(request);
    }

    deleteMeeting(global, request){
        console.log("Delete Meeting");
        return (global) ? this.chime.deleteMeeting(request) : this.chimeMeetings.deleteMeeting(request);
    }
    
    startMeetingTranscription(global, request){
        console.log("Start Meeting Transcription");
        return (global) ? this.chime.startMeetingTranscription(request) : this.chimeMeetings.startMeetingTranscription(request);
    }

    stopMeetingTranscription(global, request){
        console.log("Stop Meeting Transcription");
        return (global) ? this.chime.stopMeetingTranscription(request) : this.chimeMeetings.stopMeetingTranscription(request);
    }

    createMediaCapturePipeline(request){
        return this.chime.createMediaCapturePipeline(request);
    }

    deleteMediaCapturePipeline(request){
        return this.chime.deleteMediaCapturePipeline(request);
    }
}