import Controller from '@ember/controller';
import { action } from '@ember/object';
import FileModel from 'file-downloader/models/file';

export default class Mockup extends Controller {
  get headerCells(): Array<string> {
    return Object.keys(this.model[0]);
  }

  getAlertMessage(): string {
    let msg = "";

    this.model.forEach((file: FileModel) => {
      if (file.isSelected && !file.isDisabled) {
        msg += `${file.path} - ${file.device}\n`;
      }
    });

    return msg || "No files selected";
  }

  @action downloadFiles(): void {
    let message = this.getAlertMessage();
    alert(message);
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    'mockup': Mockup;
  }
}