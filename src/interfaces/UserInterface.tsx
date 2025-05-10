export interface UserItemProps {
  id: number;
  name: string;
  avatar: string;
  selected: boolean;
  onPress: () => void;
}

export interface User {
  id: number;
  name: string;
  avatar: string;
}
