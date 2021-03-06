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
  usertype='';


 
  
  constructor( public _socketService: SocketService,private modalService: NgbModal
   

  ) { 

     this.chatText = '';
     this._socketService.chatClientId='123';

  }

  ngOnInit(): void {

   

    this._socketService.socket.on('agent_connected', (data: any) => {
      //console.log("DAta received",data.data);
      //alert(data)
      //this.data = data;
      let chatMessage = new  ChatBubble(data.data,"chat-bubble me");
      this.message_stack.push(chatMessage);
      
    });

    // Used when users asks for support
    this._socketService.socket.on('client_connected', (data: any) => {
      console.log("DAta received",data.data);
     //alert(data)
      // Open pop up if the user is agent
      //this.modalService.open(SupportDialogComponent);
      let chatMessage = new  ChatBubble(data.data,"chat-bubble me");
      this.message_stack.push(chatMessage);
      this._socketService.chatClientId=data.client_id
      
    });

    this._socketService.socket.on('provide_support_all_agents', (data: any) => {
      console.log("DAta received",data.data);
      //alert('provide support')
      // Open pop up if the user is agent
      //this.modalService.open(SupportDialogComponent);

      let chatMessage = new  ChatBubble("Modal pop up on agents side to confirm the request","chat-bubble me");
      this.message_stack.push(chatMessage);

      chatMessage = new  ChatBubble("If Yes. Client will get confirmation","chat-bubble me");
      this.message_stack.push(chatMessage);


      this._socketService.socket.emit('support_confirmed', {data: ' I am John , How can I help you ?','client_id':this._socketService.chatClientId});
      this._socketService.conversation_mode='private';
      chatMessage = new  ChatBubble(data.data,"chat-bubble me");
      this.message_stack.push(chatMessage);
      
    });


    this._socketService.socket.on('setup_private_conversation', (data: any) => {
      console.log("DAta received",data.data);
      //alert('provide support')
      // Open pop up if the user is agent
      //this.modalService.open(SupportDialogComponent);
      let chatMessage = new  ChatBubble("Support Confirmed.","chat-bubble me");
      this.message_stack.push(chatMessage);
      this._socketService.conversation_mode='private'
      
    });

    
    this._socketService.socket.on('private_conversation', (data: any) => {
      console.log("DAta received",data.data);
      //alert('provide support')
      // Open pop up if the user is agent
      //this.modalService.open(SupportDialogComponent);
      let chatMessage = new  ChatBubble(data.data,"chat-bubble me");
      this.message_stack.push(chatMessage);
      
    });

    this._socketService.socket.on('leave_private_conversation', (data: any) => {
      //console.log("DAta received",data.data);
      //alert('provide support')
      // Open pop up if the user is agent
      //this.modalService.open(SupportDialogComponent);
      //alert('Hey')
      let chatMessage = new  ChatBubble('Your conversation has been ended.',"chat-bubble me");
      this.message_stack.push(chatMessage);

      if(this._socketService.userType=='client'){
        this._socketService.connectClient(this._socketService.chatClientId)
      }
      else{
        //this._socketService.chatClientId=''
        this._socketService.connectAgent()

      }

      this._socketService.conversation_mode='normal'
      
    });



  
  }


  clickAgent(){

    this._socketService.connectAgent()


  }

  clickClient(){

    this._socketService.connectClient(this._socketService.chatClientId)


  }

  clickDisconnect(){

    this._socketService.disconnectClient(this._socketService.chatClientId);




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
    console.log(this._socketService.conversation_mode)
    console.log(this._socketService.userType)

     if(this._socketService.conversation_mode=='private'){

      this._socketService.socket.emit('private_conversation', {data: this.chatText,'client_id':this._socketService.chatClientId});
    }

    // if its client user || NOT for agents
    if(this._socketService.userType == 'client'){
      //alert(this._socketService.userType)
      this._socketService.getAgentSupport(this.chatText)
      //this._socketService.socket.emit('send_support', {data: ' I need support','client_id':'123'});
      //let chatMessage = new  ChatBubble("Please wait while we connect to an agent","chat-bubble you");
    //this.message_stack.push(chatMessage);
    }
   
  

    //this._socketService.socket.emit('my_broadcast_event', {data: 'Broadcast message SocketServer...'});

    //clearing the chat box
    this.chatText = '';
  }








  }

}
