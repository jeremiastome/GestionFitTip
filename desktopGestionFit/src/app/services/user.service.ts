import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  apiUrl: String = 'http://localhost:8080/api/';

  httpOptions: any;

  constructor(public http: HttpClient) {
    console.log('Hello UserProvider Provider');

  }

  marcarAsistencia(rfid): Observable<Response>{
    return this.http.post<Response>(this.apiUrl + "assist/student/" + rfid,{observe: "response"},{});
  }

  registrarRfid(mail, rfid){
    return this.http.post(this.apiUrl + "addRfid/" + mail + "/" + rfid,{});
  }

  addLessons(mail, lessons){
    return this.http.put(this.apiUrl + "addLessonsDesktop/" + mail + "/" + lessons, {});
  }

}
