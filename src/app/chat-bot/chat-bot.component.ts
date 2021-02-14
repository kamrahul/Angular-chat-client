import { Component, OnInit } from '@angular/core';
import { ChatBubble } from '../chat-bubble';
import { SocketService } from '../service/socket.service';


@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss']
})
export class ChatBotComponent implements OnInit {
  chat_send_form: any;
  chatText: string;
  message_stack :Array<ChatBubble> =[]
 
  
  constructor( private _socketService: SocketService

  ) { 

     this.chatText = '';

  }

  ngOnInit(): void {

    this._socketService.socket.on('my_response', (data: any) => {
      console.log("DAta received",data.data);
      //alert(data)
      //this.data = data;
      let chatMessage = new  ChatBubble(data.data,"chat-bubble me");
      this.message_stack.push(chatMessage);
      
    });

  
  }

  submitQuery():void{

    if (this.chatText){
    console.log(this.chatText)
    let chatMessage = new  ChatBubble(this.chatText,"chat-bubble you");
    this.message_stack.push(chatMessage);
    this._socketService.socket.emit('my_event', {data: 'connected to the SocketServer...'});
    this._socketService.socket.emit('my_broadcast_event', {data: 'Broadcast message SocketServer...'});

    //clearing the chat box
    this.chatText = '';
  }








  }

}
