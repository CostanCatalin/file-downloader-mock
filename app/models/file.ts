import EmberObject from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class FileModel extends EmberObject {
  name: string;
  device: string;
  path: string;
  status: string;
  @tracked isSelected: boolean = false;
  @tracked isDisabled: boolean = false;

  constructor(name: string, device: string, path: string, status: string) {
    super(...arguments);
    this.name = name;
    this.device = device;
    this.path = path;
    this.status = status;

    if (status !== 'available') {
      this.isDisabled = true;
    }
  }
}
