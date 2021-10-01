import FileModel from 'file-downloader/models/file';

export type ListArgs = {
  items: Array<FileModel>;
  headerCells: Array<string>;
  downloadAction: (data: any) => void;
};
