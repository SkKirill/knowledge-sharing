/*import { Component, Input } from '@angular/core';

interface Message {
  id: string;
  text: string;
  senderId: string;
  timestamp: Date;
  isOwn: boolean;
}

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent {
  @Input() currentChat: {
    userId: string;
    userName: string;
    userAvatar: string;
    messages: Message[];
  } | null = null;

  newMessage = '';

  sendMessage() {
    if (!this.newMessage.trim() || !this.currentChat) return;
    
    const newMsg: Message = {
      id: Date.now().toString(),
      text: this.newMessage,
      senderId: 'current-user-id', // Заменить на реальный ID
      timestamp: new Date(),
      isOwn: true
    };
    
    this.currentChat.messages.push(newMsg);
    this.newMessage = '';
  }
}*/