import { Component, OnInit } from '@angular/core';
import { ChatBubble } from '../chat-bubble';


@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss']
})
export class ChatBotComponent implements OnInit {
  chat_send_form: any;
  chatText: string;
  message_stack :Array<ChatBubble> =[]
 
  
  constructor(

  ) { 

     this.chatText = '';

  }

  ngOnInit(): void {
  }

  submitQuery():void{

    if (this.chatText){
    console.log(this.chatText)
    let chatMessage = new  ChatBubble(this.chatText,"chat-bubble you");
    this.message_stack.push(chatMessage);

    //clearing the chat box
    this.chatText = '';
  }








  }

}
