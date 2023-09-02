export interface IComment {
  id: string;
  userId: string;
  propertyId: string;
  grade: number;
  header: string;
  content: string;
}

export interface ICommentDisplay {
  id: string;
  propertyId: string;
  userName: string;
  grade: number;
  header: string;
  content: string;
}
