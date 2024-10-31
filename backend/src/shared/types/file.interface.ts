export interface File {
  id?: string;
  originalName: string;
  subDirectory: string;
  size: number;
  mimetype: string;
  hashName: string;
  path: string;
  createdAt: Date;
}

export interface StoredFile {
  filename: string;
  fileExtension: string;
  subDirectory: string;
  path: string;
}
