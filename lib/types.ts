export type Post = {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  readingTime: string;
  content: string;
};

export type PostMeta = Omit<Post, "content">;

export type Talk = {
  title: string;
  event: string;
  date: string;
  youtubeId: string;
  description?: string;
};
