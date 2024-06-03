export interface ChatMessage {
    id: string;
    text: string;
    sender: 'me' | 'other';
    timestamp: string;
    read: boolean;
  }
  
  export interface ChatRoom {
    id: string;
    participants: string[];
    messages: ChatMessage[];
  }
  
  export interface TypingStatus {
    user: string;
    isTyping: boolean;
  }
  