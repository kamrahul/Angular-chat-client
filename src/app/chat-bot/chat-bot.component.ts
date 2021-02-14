import { Component, OnInit } from '@angular/core';
import { ChatBubble } from '../chat-bubble';
import { SocketService } from '../service/socket.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {SupportDialogComponent} from '../support-dialog/support-dialog.component'



@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss']
})
export class ChatBotComponent implements OnInit {
  chat_send_form: any;
  chatText: string;
  message_stack :Array<ChatBubble> =[]
  closeResult: string="";


 
  
  constructor( private _socketService: SocketService,private modalService: NgbModal
   

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

    // Used when users asks for support
    this._socketService.socket.on('provide_support', (data: any) => {
      console.log("DAta received",data.data);
      // Open pop up if the user is agent
      this.modalService.open(SupportDialogComponent);
      let chatMessage = new  ChatBubble(data.data,"chat-bubble me");
      this.message_stack.push(chatMessage);
      
    });
  
  }

  openModal() {

    this.modalService.open(SupportDialogComponent);
    // const modalRef = this.modalService.open(SupportDialogComponent,
    //   {
    //     scrollable: true,
    //     windowClass: 'myCustomModalClass',
    //     // keyboard: false,
    //     // backdrop: 'static'
    //   });

    // let data = {
    //   prop1: 'Some Data',
    //   prop2: 'From Parent Component',
    //   prop3: 'This Can be anything'
    // }

    // modalRef.componentInstance.fromParent = data;
    // modalRef.result.then((result) => {
    //   console.log(result);
    // }, (reason) => {
    // });
  }


  

  submitQuery():void{

    if (this.chatText){
    console.log(this.chatText)
    let chatMessage = new  ChatBubble(this.chatText,"chat-bubble you");
    this.message_stack.push(chatMessage);

    // if its client user || NOT for agents
    if(this._socketService.useType = 'client'){
      alert(this._socketService.useType)
      this._socketService.socket.emit('send_support', {data: ' I need support','client_id':'123'});
      //let chatMessage = new  ChatBubble("Please wait while we connect to an agent","chat-bubble you");
    //this.message_stack.push(chatMessage);
    }
  

    //this._socketService.socket.emit('my_broadcast_event', {data: 'Broadcast message SocketServer...'});

    //clearing the chat box
    this.chatText = '';
  }








  }

}
