import { Component, OnInit } from '@angular/core';
import { ChatService, Message } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  messageList : Message[] = []
  newMessage! : string
  sender! : string

  groupList : string[] = []
  selectedGroup! : string

  constructor(
    private chat : ChatService
  ) { }

  ngOnInit(): void {
    this.chat.connection()

    this.chat.myHub.on("receiveMessage", (message : Message) => {
      this.messageList.push(message)
    })

    this.chat.getMessage().subscribe({
      next : (data : Message[]) => this.messageList = data
    })
  }

  joinGroup(groupName : string) {
    this.chat.myHub.send("JoinGroup", groupName)
    this.groupList.push(groupName)
    this.chat.myHub.on("fromGroup"+groupName, (message) => this.messageList.push(message))
  }

  sendToGroup() {
    let myMessage : Message = {
      sender : this.sender,
      content : this.newMessage,
      time : new Date()
    }
    this.chat.myHub.send("SendMessageToGroup", myMessage, this.selectedGroup)

  }

  sendMessage() {
    let myMessage : Message = {
      sender : this.sender,
      content : this.newMessage,
      time : new Date()
    }
    this.chat.myHub.send("SendMessage", myMessage)
  }

}
