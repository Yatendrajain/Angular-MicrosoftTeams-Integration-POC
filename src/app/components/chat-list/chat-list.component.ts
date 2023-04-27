import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChatService } from './../../services/chat.service';
import { Chat } from './../../models/chat.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
})
export class ChatListComponent implements OnInit {
  @Input() chats: Chat[];
  @Output() chatSelected = new EventEmitter<Chat>();

  constructor(private chatService: ChatService, private router: Router) {}

  selectChat(chat: Chat) {
    this.chatSelected.emit(chat);
    this.router.navigate(['/chats', chat.id]);
  }

  ngOnInit() {
    this.chatService.getAllChats().subscribe((result) => {
      this.chats = result.value;
      console.log(result);
    });
  }
}
