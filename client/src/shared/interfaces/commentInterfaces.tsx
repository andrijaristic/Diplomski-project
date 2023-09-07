export interface IComment {
  id: string;
  propertyId: string;
  propertyName: string;
  userFullName: string;
  grade: number;
  header: string;
  content: string;
  creationDate: Date;
}

export interface INewComment {
  propertyId: string;
  header: string;
  content: string;
  grade: number;
}
