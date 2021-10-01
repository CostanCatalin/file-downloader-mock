import Component from '@glimmer/component';
import { action } from '@ember/object';
import { SafeString } from '@ember/template/-private/handlebars';
import { htmlSafe } from '@ember/template';

interface CheckboxArgs {
  isSelected: boolean;
  isDisabled: boolean;
  customClass: string;
  state: string;
  text: string;
  selectionCallback: (flag: boolean) => void;
}

export default class Checkbox extends Component<CheckboxArgs> {
  get customClassSafe(): SafeString {
    return htmlSafe(this.args.customClass);
  }

  get stateClass(): SafeString {
    if (this.args.state) {
      return htmlSafe(this.args.state);
    }

    if (this.args.isDisabled) {
      return htmlSafe('disabled');
    }

    if (this.args.isSelected) {
      return htmlSafe('selected');
    }

    return htmlSafe('');
  }

  @action toggleSelection(): void {
    if (!this.args.isDisabled && this.args.selectionCallback) {
      this.args.selectionCallback(!this.args.isSelected);
    }
  }
}
