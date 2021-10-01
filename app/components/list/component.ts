import { action } from '@ember/object';
import { htmlSafe } from '@ember/template';
import { SafeString } from '@ember/template/-private/handlebars';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import FileModel from 'file-downloader/models/file';
import { ListArgs } from './common';

export default class List extends Component<ListArgs> {
  @tracked selectedItemsCount = 0;
  @tracked selectAllState = '';

  get selectedText(): SafeString {
    let text =
      this.selectedItemsCount === 0
        ? 'None Selected'
        : 'Selected ' + this.selectedItemsCount;
    return htmlSafe(text);
  }

  get maxSelectedItemCount(): number {
    return this.args.items.filter((item: FileModel) => {
      return !item.isDisabled;
    }).length;
  }

  selectAllItems(): void {
    this.args.items.forEach((item: FileModel) => {
      if (!item.isDisabled) {
        item.isSelected = true;
      }
    });
    this.selectedItemsCount = this.maxSelectedItemCount;
  }

  deselectAllItems(): void {
    this.args.items.forEach((item: FileModel) => {
      item.isSelected = false;
    });
    this.selectedItemsCount = 0;
  }

  updateSelectAllState(): void {
    if (this.selectedItemsCount === this.maxSelectedItemCount) {
      this.selectAllState = 'selected';
    } else if (this.selectedItemsCount === 0) {
      this.selectAllState = '';
    } else {
      this.selectAllState = 'indeterminate';
    }
  }

  @action selectAllClicked(flag: boolean): void {
    console.log('select all', flag);

    if (this.selectAllState === 'selected') {
      this.deselectAllItems();
    } else {
      this.selectAllItems();
    }

    this.updateSelectAllState();
  }

  @action itemSelectionChanged(item: any): void {
    if (item.isDisabled) {
      return;
    }

    if (item.isSelected) {
      this.selectedItemsCount -= 1;
    } else {
      this.selectedItemsCount += 1;
    }

    item.isSelected = !item.isSelected;
    this.updateSelectAllState();
  }
}
