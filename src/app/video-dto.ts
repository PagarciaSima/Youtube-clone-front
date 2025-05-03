export interface VideoDto {
    createdAt?: string;
    id: string;
    title: string;
    description: string;
    tags: Array<string>;
    videoUrl: string;
    videoStatus: string;
    thumbnailUrl: string;
    likeCount: number;
    dislikeCount: number;
    viewCount: number;
  }