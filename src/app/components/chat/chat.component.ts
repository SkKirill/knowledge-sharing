import { Component, Input, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

interface Message {
  id: number;
  userId: number;
  text?: string;
  type: 'text' | 'audio' | 'video' | 'image' | 'file';
  timestamp: Date;
  url?: string;
  audioBlob?: Blob;
  videoBlob?: Blob;
  forwardedFrom?: string;
  isForwarded?: boolean;
  reactions?: { [key: string]: number };
  quotedMessage?: Message;
}

interface User {
  id: number;
  name: string;
  avatar: string;
  online: boolean;
  lastSeen?: Date;
  isTyping?: boolean;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatTooltipModule
  ]
})
export class ChatComponent implements OnInit {
  // Add this method to your ChatComponent class
//    constructor(private renderer: Renderer2) {}

  triggerFileInput() {
    const fileInput = document.getElementById('file-upload');
    if (fileInput) {
      fileInput.click();
    }
  }
getObjectKeys(obj: any): string[] {
  return obj ? Object.keys(obj) : [];
}
  // --- Эмодзи ---
  showEmojiPicker = false;
  showReactionPickerId: number | null = null;
  emojis = ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰',
            '😘', '😗', '😙', '😚', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨'];
  reactionEmojis = ['👍', '👎', '❤️', '🔥', '🥰', '👏', '😁', '🤔', '🤯', '😢', '🎉', '🤩', '👻'];

  // --- Входящие данные ---
  @Input() activeUser: User = {
    id: 1,
    name: 'Иван Иванов',
    avatar: 'https://via.placeholder.com/50',
    online: true
  };

  // --- Сообщения ---
  messages: Message[] = [];
  newMessage: string = '';
  isRecording = false;
  isRecordingAudio = false;
  recordingTime = 0;
  mediaRecorder: MediaRecorder | null = null;
  audioChunks: Blob[] = [];
  selectedMessages: number[] = [];
  forwardingMode = false;
  replyingTo: Message | null = null;
  typingTimeout: any;

  // --- DOM элементы ---
  @ViewChild('messagesContainer') messagesContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('messageInput') messageInput!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this.loadMockMessages();
    this.simulateTyping();
    setTimeout(() => this.scrollToBottom(), 100);
  }

  loadMockMessages() {
    this.messages = [
      {
        id: 1,
        userId: this.activeUser.id,
        text: 'Привет! Как дела?',
        type: 'text',
        timestamp: new Date(Date.now() - 600000),
        reactions: { '👍': 1, '❤️': 2 }
      },
      {
        id: 2,
        userId: 0,
        text: 'Всё отлично, спасибо! А у тебя?',
        type: 'text',
        timestamp: new Date(Date.now() - 590000),
        reactions: { '😊': 1 }
      },
      {
        id: 3,
        userId: this.activeUser.id,
        text: 'Тоже всё хорошо! Посмотри это видео',
        type: 'text',
        timestamp: new Date(Date.now() - 580000)
      },
      {
        id: 4,
        userId: this.activeUser.id,
        type: 'video',
     //   url: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
        timestamp: new Date(Date.now() - 570000),
        reactions: { '🔥': 3 }
      },
      {
        id: 5,
        userId: 0,
        text: 'Крутое видео!',
        type: 'text',
        timestamp: new Date(Date.now() - 560000),
        quotedMessage: {
          id: 4,
          userId: this.activeUser.id,
          type: 'video',
      //    url: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
          timestamp: new Date(Date.now() - 570000)
        }
      }
    ];
  }

  simulateTyping() {
    // Симуляция набора сообщения другим пользователем
    setTimeout(() => {
      this.activeUser.isTyping = true;
      
      setTimeout(() => {
        this.activeUser.isTyping = false;
        this.messages.push({
          id: Date.now(),
          userId: this.activeUser.id,
          text: 'Ты уже посмотрел то видео, что я отправлял?',
          type: 'text',
          timestamp: new Date()
        });
        this.scrollToBottom();
      }, 2000);
    }, 10000);
  }

  // --- Отправка текста ---
  sendText() {
    if (!this.newMessage.trim()) return;
    
    const newMsg: Message = {
      id: Date.now(),
      userId: 0,
      text: this.newMessage.trim(),
      type: 'text',
      timestamp: new Date()
    };

    if (this.replyingTo) {
      newMsg.quotedMessage = this.replyingTo;
      this.replyingTo = null;
    }

    this.messages.push(newMsg);
    this.newMessage = '';
    setTimeout(() => this.scrollToBottom(), 100);
    
    // Сброс фокуса на инпут
    setTimeout(() => {
      if (this.messageInput.nativeElement) {
        this.messageInput.nativeElement.focus();
      }
    }, 0);
  }

  // --- Прокрутка вниз ---
  scrollToBottom(behavior: ScrollBehavior = 'smooth'): void {
    try {
      const container = this.messagesContainer.nativeElement;
      container.scrollTo({
        top: container.scrollHeight,
        behavior: behavior
      });
    } catch (err) {
      console.error('Scroll error:', err);
    }
  }

  // --- Запись голосового сообщения ---
  async startRecording() {
    if (!navigator.mediaDevices?.getUserMedia) {
      alert('Ваш браузер не поддерживает запись аудио');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      this.mediaRecorder.start();
      this.isRecording = true;
      this.isRecordingAudio = true;
      this.audioChunks = [];
      this.recordingTime = 0;

      const timer = setInterval(() => {
        this.recordingTime++;
      }, 1000);

      this.mediaRecorder.addEventListener('dataavailable', (e: BlobEvent) => {
        this.audioChunks.push(e.data);
      });

      this.mediaRecorder.addEventListener('stop', () => {
        clearInterval(timer);
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        
        this.messages.push({
          id: Date.now(),
          userId: 0,
          type: 'audio',
          timestamp: new Date(),
          url,
          audioBlob
        });
        
        this.isRecording = false;
        this.isRecordingAudio = false;
        this.recordingTime = 0;
        this.scrollToBottom();
        
        // Освобождаем ресурсы микрофона
        stream.getTracks().forEach(track => track.stop());
      });
    } catch (error) {
      console.error('Error recording audio:', error);
      this.isRecording = false;
      this.isRecordingAudio = false;
      alert('Не удалось получить доступ к микрофону');
    }
  }

  stopRecording() {
    if (this.mediaRecorder && this.isRecording) {
      this.mediaRecorder.stop();
      this.isRecording = false;
    }
  }

  toggleRecording() {
    if (this.isRecording) {
      this.stopRecording();
    } else {
      this.startRecording();
    }
  }

  cancelRecording() {
    this.stopRecording();
    this.isRecordingAudio = false;
    this.recordingTime = 0;
  }

  // --- Прикрепление файлов ---
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    let type: Message['type'] = 'file';
    if (file.type.startsWith('image/')) type = 'image';
    else if (file.type.startsWith('video/')) type = 'video';
    else if (file.type.startsWith('audio/')) type = 'audio';

    const url = URL.createObjectURL(file);

    this.messages.push({
      id: Date.now(),
      userId: 0,
      type,
      timestamp: new Date(),
      url,
      ...(type === 'audio' && { audioBlob: file }),
      ...(type === 'video' && { videoBlob: file })
    });

    this.scrollToBottom();
    input.value = '';
  }

  // --- Эмодзи ---
  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
    this.showReactionPickerId = null;
  }

  addEmoji(emoji: string) {
    this.newMessage += emoji;
    this.showEmojiPicker = false;
  }

  // --- Реакции ---
  toggleReactionPicker(messageId: number) {
    this.showReactionPickerId = this.showReactionPickerId === messageId ? null : messageId;
    this.showEmojiPicker = false;
  }

  addReaction(messageId: number, emoji: string) {
    const message = this.messages.find(m => m.id === messageId);
    if (!message) return;

    if (!message.reactions) {
      message.reactions = {};
    }

    if (message.reactions[emoji]) {
      message.reactions[emoji]++;
    } else {
      message.reactions[emoji] = 1;
    }

    this.showReactionPickerId = null;
  }

  removeReaction(messageId: number, emoji: string) {
    const message = this.messages.find(m => m.id === messageId);
    if (!message || !message.reactions || !message.reactions[emoji]) return;

    message.reactions[emoji]--;
    if (message.reactions[emoji] <= 0) {
      delete message.reactions[emoji];
    }
  }

  // --- Пересылка сообщений ---
  toggleMessageSelection(messageId: number) {
    if (this.forwardingMode) {
      const index = this.selectedMessages.indexOf(messageId);
      if (index === -1) {
        this.selectedMessages.push(messageId);
      } else {
        this.selectedMessages.splice(index, 1);
      }
    }
  }

  startForwarding() {
    this.forwardingMode = true;
    this.selectedMessages = [];
    this.replyingTo = null;
  }

  cancelForwarding() {
    this.forwardingMode = false;
    this.selectedMessages = [];
  }

  forwardMessages() {
    if (this.selectedMessages.length === 0) {
      this.forwardingMode = false;
      return;
    }

    const forwardedMessages = this.messages
      .filter(m => this.selectedMessages.includes(m.id))
      .map(m => ({
        ...m,
        isForwarded: true,
        forwardedFrom: this.activeUser.name
      }));

    this.messages.push(...forwardedMessages);
    this.forwardingMode = false;
    this.selectedMessages = [];
    this.scrollToBottom();
  }

  // --- Ответ на сообщения ---
  replyToMessage(message: Message) {
    this.replyingTo = message;
    this.forwardingMode = false;
    this.messageInput.nativeElement.focus();
  }

  cancelReply() {
    this.replyingTo = null;
  }

  // --- Обработка ввода текста ---
  onInputTyping() {
    // Симуляция индикатора "печатает..."
    // В реальном приложении здесь был бы вызов API
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }
    
    // Здесь должна быть логика отправки статуса "печатает" на сервер
    // Для демо просто очищаем таймаут
    this.typingTimeout = setTimeout(() => {
      // Таймаут бездействия
    }, 3000);
  }

  // --- Обработка нажатий клавиш ---
  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    if (this.forwardingMode) {
      this.cancelForwarding();
    }
    if (this.replyingTo) {
      this.cancelReply();
    }
    if (this.showEmojiPicker || this.showReactionPickerId !== null) {
      this.showEmojiPicker = false;
      this.showReactionPickerId = null;
    }
  }

  // --- Форматирование времени записи ---
  formatRecordingTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  // --- Вспомогательные методы ---
  isMessageSelected(messageId: number): boolean {
    return this.selectedMessages.includes(messageId);
  }

  trackByMessageId(index: number, message: Message): number {
    return message.id;
  }
}