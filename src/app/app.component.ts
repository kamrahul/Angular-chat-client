import { Component, OnInit } from '@angular/core';
import { SocketService } from './service/socket.service';
//import * as io from 'socket.io-client';
//import {io} from 'socket.io-client/build/index';
declare var io: any ;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private socket: any;
  public data: any;

constructor(private _socketService : SocketService){


}

public ngOnInit(): void {
  
 
  


  this._socketService.socket.on('connect', (data: any) => {

  
    this._socketService.socket.emit('my_event', {data: 'connected to the SocketServer...'});
});
}

  title = 'Angular-chat-client';
}
