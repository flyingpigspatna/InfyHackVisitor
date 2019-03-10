import { GlobalService } from './../global-service.service';
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { Router } from '@angular/router';
import * as parser from 'fast-xml-parser';
import { xmlOptions } from '../app.constants';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent implements OnInit {
  device;
  scannedMessage = '';
  errorMessage = '';
  @Output() emitDetails = new EventEmitter();
  @ViewChild('scanner') scanner: ZXingScannerComponent;
  constructor(private router: Router, public globalService: GlobalService) { }

  ngOnInit() {
  }

  foundCameras(event) {
    this.device = event[0];
  }

  scanSuccess(event) {
    const json = parser.parse(event, xmlOptions).PrintLetterBarcodeData;
    const obj = {
      name: json.name,
      dob: json.dob,
      uid: json.uid
    };
    this.globalService.employeeName = json.name;
    console.log(obj);
    this.emitDetails.emit(obj);
  }

  scanError(event) {
    this.errorMessage = event;
  }

  scanComplete(event) {
    this.errorMessage = event;
  }

  scanFailed(event) {
    this.errorMessage = event;
  }

}
