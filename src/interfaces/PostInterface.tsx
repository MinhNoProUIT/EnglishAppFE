export interface Post {
  id: string;
  user_id: string;
  react_count: number;
  content: string;
  created_date: string; // ISO date string
  image_url: string | null;
  author_name: string;
  author_image_url: string | null;
  shared_user_id_count: number;
  comment_count: number;
  isLike?: boolean;
}

export interface PostCreate {
  user_id: string;
  image: string;
  content: string;
}

export interface MyPostData {
  id: number,
  imageUrl: string,
  totalLikes: number,
  totalComments: number,
  shared: boolean
}

export interface PostModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
}