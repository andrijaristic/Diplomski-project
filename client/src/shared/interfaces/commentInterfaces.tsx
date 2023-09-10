export interface IComment {
  id: string;
  accommodationId: string;
  accommodationName: string;
  userFullName: string;
  grade: number;
  header: string;
  content: string;
  creationDate: Date;
}

export interface INewComment {
  accommodationId: string;
  header: string;
  content: string;
  grade: number;
}
