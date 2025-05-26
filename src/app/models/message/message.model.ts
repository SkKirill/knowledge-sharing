export interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  timestamp: Date;
}

export interface Attachment {
  type: 'image' | 'document' | 'audio' | 'video';
  url: string;
  name?: string;
}