import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client'
import { AuthService } from '../auth.service';
import { AppToastService } from '../toast.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  socket: any
  name='william'
  users: any = []
  chats: any = []
  currentChat: any
  receiverUser: any
  selectValue: any = ""
  authUser: any
  toastService: any
  messageText: string = ""

  constructor(public authService: AuthService, toastService: AppToastService) {
    this.authUser = this.authService.getAuthUser()
    this.toastService = toastService

    this.authService.getAllUsersWithoutPagination().subscribe((res) => {
      console.log(res);  
      this.users = res
    },
    (err) => {
      console.log(err);
    })

    console.log(this.authUser);
    
    this.socket = io.io(`localhost:8000`, {
      auth: this.authUser
    })
  }

  ngOnInit(): void {

    this.socket.on('chats-list',(data: any)=>{
      console.log('ok received', data);
      this.chats = data
    })

    this.socket.on('get-current-hat',(data: any)=>{
      this.currentChat = data
    })

    this.socket.on("private message", (data: any) => {
      
      
      if(data?._id === this.currentChat?._id){
        this.openChat(this.currentChat)
      }
    });

  }

  isChattingWith(id: string){
    if(this.chats.length === 0){
      return false
    }
    for(let chat of this.chats){
      if(id === chat.user_starter_id || id === chat.user_joiner_id){
        return true
      }  
    }
    return false
  }

  getAppropiateChat(id: string){
    for(let chat of this.chats){
      if(id === chat.user_starter_id || id === chat.user_joiner_id){
        return chat
      }  
    }
    return undefined
  }

  StartChat(){
    this.authService.getUserProfile(this.selectValue).subscribe((res) => { 
      this.receiverUser = res
      if(this.selectValue !== this.authUser._id){
        if(!this.isChattingWith(this.selectValue)){
          const chatObject = {
            user_starter: this.authUser,
            user_joiner: res,
            user_starter_id: this.authUser._id,
            user_joiner_id: res._id,
            message: []
          }
    
          this.socket.emit('create-chat', chatObject)
        } else {
          this.openChat(this.getAppropiateChat(this.selectValue))
        }
      }else{
        this.toastService.show('Important !', 'You can not discuss with yourself.') 
        this.selectValue = ""
      }

    },
    (err) => {
      console.log(err);
    })
  }

  openChat(chat: any){
    this.socket.emit('open-chat', {chatId: chat._id})
  }

  sendMsg(){
    if(this.messageText.length !== 0){
      const message = {
        message: this.messageText,
        from: this.authUser._id
      }
      this.currentChat = {...this.currentChat, message: [...this.currentChat.message, message]}
      this.socket.emit("private message", {
        chatId: this.currentChat._id,
        to: this.getMessageReceiver(this.currentChat),
        last_message: {
          message: this.messageText,
          from: this.authUser._id
        }
      });
      
      this.messageText = ""
    }
  }

  getCuttedString(str: any){
    return str ? str.substr(0,50) : ''
  }

  getChatTitle(chat: any){ 
      if(this.authUser._id === chat.user_starter_id){
        return chat.user_joiner.first_name+' '+chat.user_joiner.last_name
      } else {
        return chat.user_starter.first_name+' '+chat.user_starter.last_name
      } 
  }

  getMessageReceiver(chat: any){ 
    if(this.authUser._id === chat.user_starter_id){
      return chat.user_joiner_id
    } else {
      return chat.user_starter_id
    } 
}

  selectChat(chat: any){
    this.openChat(chat)
  }

}
