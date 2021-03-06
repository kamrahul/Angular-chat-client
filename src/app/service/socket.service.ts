import { Injectable } from '@angular/core';
declare var io: any ;

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public socket:any;
  userType: any= 'agent';
  conversation_mode: string ='normal';
  chatClientId: string ='';

  constructor() {

    // Connect Socket with server URL
    this.socket = io('http://127.0.0.1:8000/test');

 

   }

   connectAgent(){

    console.log('New agent')
    this.socket.emit('new_agent', {data: 'Agent connected to the SocketServer...'});
    this.userType ="agent";
   

   }

   connectClient(clientId:string){

      console.log('New client')
      this.socket.emit('new_client', {data: 'Client connected to the SocketServer...','client_id':clientId});
      this.userType ="client";
      
   
   }

   getAgentSupport(chat_text: string){
    

    this.socket.emit('need_support', {data: chat_text,client_id:this.chatClientId});



  }


  disconnectClient(clientId: string){


    this.socket.emit('disconnect_private_conversation', {data: 'Client disconnected from conversation...','client_id':clientId});
 
 }
}
