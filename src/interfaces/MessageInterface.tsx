export interface MessageItemProps {
  id: string;
  sender_id: string;
  sender_username: string;
  sender_image_url: string;
  content: string;
  created_date: string; 
}

export interface SendMessageProps {
  sender_id: string;
  group_id: string;
  content: string;
}

