import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackEndServiceService {

  constructor(public httpClient: HttpClient) { }

  cardDetails(Id: string, userData): Observable<any>{
    // return this.httpClient.get('');
    return of({success: true});
  }
}
