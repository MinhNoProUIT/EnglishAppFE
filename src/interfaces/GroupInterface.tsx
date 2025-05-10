export interface GroupItemProps {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unseenCount: number;
  onPress: () => void;
}

export interface CreateGroupProps {
  name: string;
  avatar: string | null;
  createdAt: Date;
  members: number[];
}
