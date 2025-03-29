
export interface Comment {
  id: number;
  postId: number;
  fullname: string;
  avatar: string;
  isLike: boolean;
  totalLike: number;
  content: string;
  createDate: Date;
}