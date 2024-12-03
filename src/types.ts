
  
  export interface ChatRoom {
    id: string;
    participants: string[];
    messages: ChatMessage[];
  }
  


export interface ChatMessage {
  id: string;
  text: string;
  room: string; // Add this property
  sender: string;
  timestamp: string;
  image?: string; // Optional property for image
}

export interface TypingStatus {
  room: string; // Add this property
  user: string;
  typing: boolean;
}
