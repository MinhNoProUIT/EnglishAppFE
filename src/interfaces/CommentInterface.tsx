export interface Comment {
  id: number;
  postId: number;
  parentId: number | null; 
  rootCommentId: number | null;
  fullname: string;
  avatar: string;
  isLike: boolean;
  totalLike: number;
  content: string;
  createDate: Date;
}