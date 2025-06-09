export interface UserItemProps {
  id: string;
  user_id: string;
  name: string;
  avatar: string;
  selected: boolean;
  onPress: () => void;
}

export interface UserItemAddGroupProps {
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

export interface UserDetail {
  id: string;
  username: string;
  birthday: string;
  gender: boolean;
  fullname: string;
  address: string;
  email: string;
  phonenumber: string;
  created_date: string;
  image_url: string; 
}
