import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import FileModel from 'file-downloader/models/file';

interface ListListItemArgs {
  item: FileModel;
  onSelectionChanged: (item: FileModel) => void;
}

export default class ListListItem extends Component<ListListItemArgs> {
  @tracked isSelected: boolean = false;

  @action clickHandler(): void {
    if (this.args.item.isDisabled) {
      return;
    }
    this.args.onSelectionChanged(this.args.item);
  }
}
