import { GlobalService } from './../global-service.service';
import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import * as faceApi from 'face-api.js';
import { tinyFaceModel } from '../app.constants';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.css']
})
export class WebcamComponent implements OnInit {
  faceDetector;
  videoOption = {video: {width: 360, height: 240}};
  counter = 0;
  capturedImage = '';
  @Output() emitImage = new EventEmitter();

  @ViewChild('inputVideo') inputVideo: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  constructor(private router: Router, private globalService: GlobalService) { }

  ngOnInit() {
    this.run();
  }

  async onPlay() {
    if (this.inputVideo.nativeElement.paused || this.inputVideo.nativeElement.ended || !this.faceDetector) {
      return setTimeout(() => this.onPlay());
    }
    const result = await faceApi.detectSingleFace(this.inputVideo.nativeElement, this.faceDetector);
    if (result) {
      this.counter += 1;
      this.drawDetections(this.inputVideo.nativeElement, this.canvas.nativeElement, [result]);
    } else {
      this.counter = 0;
      this.drawDetections(this.inputVideo.nativeElement, this.canvas.nativeElement, []);
    }
    if (this.counter === 10) {
      this.takeScreenshot(this.canvas.nativeElement, this.inputVideo.nativeElement);
    }
    setTimeout(() => this.onPlay());
  }

  async run() {
    await faceApi.nets.tinyFaceDetector.loadFromUri(tinyFaceModel.url);
    // load face detection model
    this.faceDetector = await new faceApi.TinyFaceDetectorOptions({ inputSize: 512, scoreThreshold: 0.6 });
    // try to access users webcam and stream the images
    // to the video element
    const stream = await navigator.mediaDevices.getUserMedia(this.videoOption);
    this.inputVideo.nativeElement.srcObject = stream;
  }

  resizeCanvasAndResults(dimensions, canvas, results) {
    canvas = this.getCanvasDimentions(canvas, dimensions);

    // resize detections (and landmarks) in case displayed image is smaller than
    // original size
    return faceApi.resizeResults(results, { width: canvas.width, height: canvas.height });
  }

  drawDetections(dimensions, canvas, detections) {
    const resizedDetections = this.resizeCanvasAndResults(dimensions, canvas, detections);
    faceApi.drawDetection(canvas, resizedDetections);
  }

  getCanvasDimentions(canvas, dimensions) {
    const { width, height } = dimensions instanceof HTMLVideoElement
      ? faceApi.getMediaDimensions(dimensions) : dimensions;
    canvas.width = width;
    canvas.height = height;
    return canvas;
  }

  takeScreenshot(canvas, dimensions) {
    canvas = this.getCanvasDimentions(canvas, dimensions);
    canvas.getContext('2d').drawImage(dimensions, 0, 0);
    this.capturedImage = canvas.toDataURL('image/webp');
    this.globalService.imageData = this.capturedImage;

    setTimeout(() => {this.emitImage.emit(this.capturedImage)},1000);
  }

}
