import { GlobalService } from './../global-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackEndServiceService } from '../service/back-end-service.service';


@Component({
  selector: 'app-new-joinee',
  templateUrl: './new-joinee.component.html',
  styleUrls: ['./new-joinee.component.css']
})
export class NewJoineeComponent implements OnInit {
  userName: string;
  dob: any;
  isUserSelected = false;
  userData;
  employeeId = '';
  showScanner = false;
  showWebcam = false;
  imageData;
  labelName = '';

  constructor(private router: Router, private api: BackEndServiceService,
    private globalService: GlobalService) { }

  ngOnInit() {
  }
  submit(){
    this.showScanner = true;
  }
  unsubmit() {
    this.showScanner = false;
    this.showWebcam = false;
  }
  emitImage(value) {
    this.imageData = value;
    this.showWebcam = false;
    this.globalService.imageData = value;
    this.globalService.employeeId = this.employeeId;
    
    this.router.navigate(['idCard']);
  }
  userSelected(id) {
    this.isUserSelected = true;
    this.labelName = 'Employee Id';
    if(id === 0){
      this.labelName = 'Visitor Id';
    }
    this.unsubmit();
  }

  getDetails(value) {
    this.userData = value;
    this.showScanner = false;
    this.api.cardDetails(this.employeeId, this.userData).subscribe(data => {
      setTimeout(() => {
        this.showWebcam = true;
      }, 2000);
    });
  }

  getDetailsManual(){
    const obj = {
      name: this.userName,
      dob: this.dob,
      uid: ''
    };
    this.globalService.employeeName = this.userName;
    this.getDetails(obj);
  }
}
