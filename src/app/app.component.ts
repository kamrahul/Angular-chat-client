import { Component, OnInit } from '@angular/core';
//import * as io from 'socket.io-client';
import {io} from 'socket.io-client/build/index';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private socket: any;
  public data: any;

constructor(){
// Connect Socket with server URL
//this.socket = io('http://127.0.0.1:8000/test');

}

public ngOnInit(): void {
 
  // this.socket.on('my_response', (data: any) => {
  //   console.log("DAta received");
  //   alert(data)
  //   this.data = data;
  //   console.log(data);
  // });
}

  title = 'Angular-chat-client';
}
