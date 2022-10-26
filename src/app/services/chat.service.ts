import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalr from '@microsoft/signalr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  myHub! : signalr.HubConnection
  apiurl : string = "https://localhost:7060"
  //apiurl : string = "http://techninetchat.somee.com"
  constructor(
    private client : HttpClient
  ) { }

  connection() {
    this.myHub = new signalr.HubConnectionBuilder()
              .withUrl(this.apiurl+"/chat").build()
    this.myHub.start()
  }

  getMessage() : Observable<Message[]> {
    return this.client.get<Message[]>(this.apiurl+"/api/chat")
  }
}

export interface Message {
  content : string
  sender : string
  time : Date
}
