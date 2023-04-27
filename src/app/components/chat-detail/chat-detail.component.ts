import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from './../../services/chat.service';
import { Chat } from './../../models/chat.model';
import { ChatMessage } from './../../models/chat-message.model';

@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.component.html',
})
export class ChatDetailComponent implements OnInit {
  chatId: string;
  chat: Chat;
  messages: ChatMessage[];
  newMessage: string;

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService
  ) {}

  ngOnInit() {
    this.chatId = this.route.snapshot.paramMap.get('id');
    this.chatService.getChatMessages(this.chatId).subscribe((message) => {
      this.messages = message.value;
    });
    this.loadMessages();
  }

  loadMessages() {
    this.chatService.getChatMessages(this.chatId).subscribe((result) => {
      this.messages = result.value;
      console.log(result);
    });
  }

  sendMessage() {
    this.chatService
      .sendChatMessage(this.chatId, this.newMessage)
      .subscribe(() => {
        this.newMessage = '';
        this.loadMessages();
      });
  }
}
