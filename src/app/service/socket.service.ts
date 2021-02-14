import { Injectable } from '@angular/core';
declare var io: any ;

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public socket:any;
  useType: any= 'agent';

  constructor() {

    // Connect Socket with server URL
    this.socket = io('http://127.0.0.1:8000/test');

    if (this.useType= "agent"){

      console.log('New agent')
      this.socket.emit('new_agent', {data: 'Agent connected to the SocketServer...'});
    }
    else{
      console.log('New client')
      this.socket.emit('new_client', {data: 'Client connected to the SocketServer...'});

    }



   }
}
