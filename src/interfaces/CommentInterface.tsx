export interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  react_count: number;
  parent_comment: string;
  root_comment: string;
  shared_post_id: string;
  content: string;
  created_date: string;
}

export interface CommentViewPost {
  id: string;
  author_name: string;
  author_image: string;
  username_parent: string;
  username_root: string;
  created_date: string;
}
// Payload cho tạo mới bình luận
export interface CreateCommentPayload {
  post_id: string;
  user_id: string;
  react_count: number;
  content: string;
  parent_comment?: string | null;
  root_comment?: string | null;
  shared_post_id?: string | null;
}

// Payload cho chỉnh sửa bình luận
export interface EditCommentPayload {
  id: string; // cần id để biết sửa bình luận nào
  content: string;
  parent_comment?: string | null;
  root_comment?: string | null;
  react_count: number;
}

// Payload cho lấy tất cả bình luận theo post
export interface GetCommentsByPostPayload {
  type: string;
  id: string;
}

export interface GetComment extends Comment {
  author_name: string;
  author_image: string;
  username_parent: string;
  username_root: string;
  isLike?: boolean;
}