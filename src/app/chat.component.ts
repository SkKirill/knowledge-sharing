/*import { Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  chats: any[] = [];
  currentChat: any = null;

  onUserSelected(user: any) {
    const existingChat = this.chats.find(c => c.userId === user.id);
    
    if (!existingChat) {
      const newChat = {
        id: Date.now().toString(),
        userId: user.id,
        userName: user.name,
        userAvatar: user.avatar,
        messages: []
      };
      this.chats.push(newChat);
      this.currentChat = newChat;
    } else {
      this.currentChat = existingChat;
    }
  }
} */