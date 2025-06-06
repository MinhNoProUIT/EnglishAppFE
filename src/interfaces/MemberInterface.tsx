export interface AddMemberData {
  id: string;
  user_id: string;
  group_id: string;
  is_admin: boolean;
}

export interface KickMemberResponse {
  message: string;
}

export interface MemberData {
  id: string;
  user_id: string;
  username: string;
  image_url: string;
  is_admin: boolean;
}
