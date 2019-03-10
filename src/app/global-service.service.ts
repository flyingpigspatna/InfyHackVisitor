import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {

  constructor() { }
  userImage: any = '';
  showScanner = false;
  showQr = false;
  imageData;
  qrData; 
  employeeId;
  employeeName;
}
