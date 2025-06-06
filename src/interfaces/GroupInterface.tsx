export interface GroupItemProps {
  id: string;
  group_name: string;
  group_image_url: string;
  last_username: string;
  last_message: string;
  last_time_message: Date;
  onPress: () => void;
}

export interface GroupItemQueryProps {
  id: string;
  group_name: string;
  group_image_url: string;
  last_username: string;
  last_message: string;
  last_time_message: Date;
}

export interface Group {
  id: string;
  name: string;
  image_url: string;
  created_by: string;
  user_ids: [string];
  count_member: number;
  created_date: Date;
}

export interface CreateGroupProps {
  name: string;
  image_url: string;
  created_by: string;
  count_member: number;
  user_ids: number[];
}
