// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

const AWS = require('aws-sdk');

module.exports = class ChimeMeetings {

    // Create an AWS SDK Chime object. Region 'us-east-1' is currently required.
    // Use the MediaRegion property below in CreateMeeting to select the region
    // the meeting is hosted in.
    

    constructor(currentRegion, controlRegion, endpoint, useChimeGlobal){
        console.log("const controlRegion",controlRegion);
        this.chime = new AWS.Chime({ region: currentRegion });

        // Set the AWS SDK Chime endpoint. The global endpoint is https://service.chime.aws.amazon.com
        this.chime.endpoint = new AWS.Endpoint(endpoint);
        this.controlRegion = (!!controlRegion) ? currentRegion : controlRegion;
        console.log("Const this.controlRegion",this.controlRegion);
        this.chimeMeetings = new AWS.ChimeSDKMeetings({ region: this.controlRegion});
        this.useChimeGlobal = useChimeGlobal;
    }

    createMeeting(request){
        console.log("Create Meeting");
        return (this.useChimeGlobal) ? this.chime.createMeeting(request) : this.chimeMeetings.createMeeting(request);
    }

    createAttendee(request){
        console.log("Create Attendee");
        return (this.useChimeGlobal) ? this.chime.createAttendee(request) : this.chimeMeetings.createAttendee(request);
    }

    deleteMeeting(request){
        console.log("Delete Meeting");
        return (this.useChimeGlobal) ? this.chime.deleteMeeting(request) : this.chimeMeetings.deleteMeeting(request);
    }
    
    startMeetingTranscription(request){
        console.log("Start Meeting Transcription");
        return (this.useChimeGlobal) ? this.chime.startMeetingTranscription(request) : this.chimeMeetings.startMeetingTranscription(request);
    }

    stopMeetingTranscription(request){
        console.log("Stop Meeting Transcription");
        return (this.useChimeGlobal) ? this.chime.stopMeetingTranscription(request) : this.chimeMeetings.stopMeetingTranscription(request);
    }

    createMediaCapturePipeline(request){
        return this.chime.createMediaCapturePipeline(request);
    }

    deleteMediaCapturePipeline(request){
        return this.chime.deleteMediaCapturePipeline(request);
    }
}