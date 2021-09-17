export interface Posts {
  id: string;
  image: string;
  likes: number;
  owner: {
    firstName: string;
    id: string;
    lastName: string;
    picture: string;
    title: string;
  };
  publishDate: string;
  tags: string[];
  text: string;
}
