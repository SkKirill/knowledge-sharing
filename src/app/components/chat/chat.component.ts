import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

interface Message {
  id: number;
  userId: number;
  text?: string;
  type: 'text' | 'audio' | 'video' | 'image' | 'file';
  timestamp: Date;
  url?: string;
  audioBlob?: Blob;
  videoBlob?: Blob;
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
    MatCardModule
  ]
})
export class ChatComponent implements OnInit {
  @Input() activeUser: any;

  messages: Message[] = [];
  newMessage: string = '';
  isRecording = false;
  mediaRecorder: any;
  audioChunks: Blob[] = [];

  @ViewChild('messagesContainer') messagesContainer!: ElementRef<HTMLDivElement>;

  ngOnInit(): void {
    this.messages = [
      {
        id: 1,
        userId: this.activeUser?.id || 1,
        text: 'Привет! Как дела?',
        type: 'text',
        timestamp: new Date(Date.now() - 600000),
      },
      {
        id: 2,
        userId: 0,
        text: 'Всё отлично, спасибо!',
        type: 'text',
        timestamp: new Date(Date.now() - 590000),
      }
    ];

    setTimeout(() => this.scrollToBottom(), 100);
  }

  sendMessage() {
    if (!this.newMessage.trim()) return;
    this.messages.push({
      id: Date.now(),
      userId: 0,
      text: this.newMessage.trim(),
      type: 'text',
      timestamp: new Date()
    });
    this.newMessage = '';
    setTimeout(() => this.scrollToBottom(), 100);
  }

  scrollToBottom(): void {
    try {
      const container = this.messagesContainer.nativeElement;
      container.scrollTop = container.scrollHeight;
    } catch (err) {
      console.error('Scroll error:', err);
    }
  }

  startRecording() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert('Ваш браузер не поддерживает запись аудио');
      return;
    }
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.start();
        this.isRecording = true;
        this.audioChunks = [];

        this.mediaRecorder.addEventListener('dataavailable', (e: any) => {
          this.audioChunks.push(e.data);
        });

        this.mediaRecorder.addEventListener('stop', () => {
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
          this.scrollToBottom();
        });
      })
      .catch(() => alert('Не удалось получить доступ к микрофону'));
  }

  stopRecording() {
    if (this.mediaRecorder && this.isRecording) {
      this.mediaRecorder.stop();
    }
  }

  toggleRecording() {
    this.isRecording ? this.stopRecording() : this.startRecording();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    let type: Message['type'] = 'file';
    if (file.type.startsWith('image/')) type = 'image';
    else if (file.type.startsWith('video/')) type = 'video';

    const url = URL.createObjectURL(file);

    this.messages.push({
      id: Date.now(),
      userId: 0,
      type,
      timestamp: new Date(),
      url
    });

    this.scrollToBottom();

    // Сброс input
    input.value = '';
  }
}