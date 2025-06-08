export interface UserItemProps {
  id: string;
  name: string;
  avatar: string;
  selected: boolean;
  onPress: () => void;
}

export interface User {
  id: string;
  username: string;
  image_url: string;
}

export interface GetAllUsersResponse {
  users: User[];
}
