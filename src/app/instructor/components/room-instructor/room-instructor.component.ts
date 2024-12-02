import { InstructorService } from './../../services/instructor.service';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import Peer from 'peerjs';
import { AuthService } from 'src/app/shared/serices/auth.service';
import { RoomService } from 'src/app/shared/serices/room.service';

@Component({
  selector: 'app-room-instructor',
  templateUrl: './room-instructor.component.html',
  styleUrls: ['./room-instructor.component.css']
})
export class RoomInstructorComponent implements OnInit, OnDestroy {
  @ViewChild('myVideo') myVideo: ElementRef<HTMLVideoElement> | undefined;
  @ViewChild('remoteVideo') remoteVideo: ElementRef<HTMLVideoElement> | undefined;

  showMyVideo: boolean = false;
  showRemoteVideo: boolean = false;

  localStream: MediaStream | undefined;
  remoteStream: MediaStream | undefined;
  peerConnection: RTCPeerConnection | undefined;
  instructorId:number=0
  instructor: any; // Assumez que vous avez l'objet `instructor`

  constructor(private roomService: RoomService, private auth:AuthService, private _InstructorService:InstructorService) {}

  ngOnInit() {
    this.instructorInfoId()
    this._InstructorService.getInstructorById(this.instructorId).subscribe({
      next:(value) =>{
        this.instructor=value
      },
      error:(err)=> {
        console.log(err);
        
      },
    })
    // Init code here
  }
  instructorInfoId(){
    this.instructorId= this.auth.getUserInfo().sub
   }


  ngOnDestroy() {
    // Cleanup code here
    if (this.peerConnection) {
      this.peerConnection.close();
    }
  }

  createRoom() {
    this.roomService.createRoom(this.instructor).subscribe({
      next: (response) => {
        console.log(response);
        
        // Open video conference here
        this.setupMediaStreams();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  async setupMediaStreams() {
    try {
      // Step 1: Get local stream (access to camera and microphone)
      this.localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (this.myVideo) {
        this.myVideo.nativeElement.srcObject = this.localStream;
      }

      // Display the video divs
      this.showMyVideo = true;
      this.showRemoteVideo = true;

      // Step 2: Create RTCPeerConnection
      this.peerConnection = new RTCPeerConnection();

      // Step 3: Add local stream to the peer connection
      this.localStream.getTracks().forEach(track => {
        this.peerConnection!.addTrack(track, this.localStream!);
      });

      // Step 4: Set up event listeners for remote stream
      this.peerConnection.ontrack = (event) => {
        if (event.streams && event.streams[0]) {
          this.remoteStream = event.streams[0];
          if (this.remoteVideo) {
            this.remoteVideo.nativeElement.srcObject = this.remoteStream;
          }
        }
      };

      // Additional signaling and ICE candidate handling would be here

    } catch (error) {
      console.error('Error accessing media devices.', error);
    }
  }

  toggleMyVideo() {
    this.showMyVideo = !this.showMyVideo;
  }

  toggleRemoteVideo() {
    this.showRemoteVideo = !this.showRemoteVideo;
  }
}