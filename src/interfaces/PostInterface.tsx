export interface PostData {
  id: number;
  images: string[];
  fullname: string;
  avatar: string;
  isLike: boolean;
  totalLike: number;
  totalCmt: number;
  totalShare: number;
  content: string;
}

export interface MyPostData {
    id: number,
    imageUrl: string,
    totalLikes: number,
    totalComments: number
}
