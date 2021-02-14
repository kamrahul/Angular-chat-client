import { Injectable } from '@angular/core';
declare var io: any ;

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public socket:any;

  constructor() {

    // Connect Socket with server URL
    this.socket = io('http://127.0.0.1:8000/test');



   }
}
