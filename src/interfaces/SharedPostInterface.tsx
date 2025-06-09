export interface CreateSharedPostProps {
  post_id: string;
  user_id: string;
  shared_post_id: string;
  react_count?: number; // có thể không truyền thì mặc định 0
  comment_count?: number; // có thể không truyền thì mặc định 0
  shared_count?: number; // có thể không truyền thì mặc định 0
  content: string;
}

export interface SharedPostResponse {
  id: string;
  post_id: string;
  user_id: string;
  shared_post_id: string;
  content: string;
  react_count: number;
  comment_count: number;
  shared_count: number;
  image_url: string;
}

export interface SharedPost {
  id: string;
  author_id: string | null;
  author_name: string | null;
  author_image_url: string | null;
  user_shared_id: string;
  user_shared_name: string;
  user_shared_image_url: string;
  react_count: number;
  content: string;
  created_date: string; // ISO date string
  image_url: string | null;
  shared_count: number;
  comment_count: number;
}
