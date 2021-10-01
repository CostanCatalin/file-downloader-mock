import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import FileModel from 'file-downloader/models/file';

function getMockModel() {
  let items = [
    {
      name: 'smss.exe',
      device: 'Stark',
      path: '\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe',
      status: 'scheduled',
    },
    {
      name: 'netsh.exe',
      device: 'Targaryen',
      path: '\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe',
      status: 'available',
    },
    {
      name: 'uxtheme.dll',
      device: 'Lannister',
      path: '\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll',
      status: 'available',
    },
    {
      name: 'cryptbase.dll',
      device: 'Martell',
      path: '\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll',
      status: 'scheduled',
    },
    {
      name: '7za.exe',
      device: 'Baratheon',
      path: '\\Device\\HarddiskVolume1\\temp\\7za.exe',
      status: 'scheduled',
    },
  ];

  return items.map((obj) => {
    return new FileModel(obj.name, obj.device, obj.path, obj.status);
  });
}

module('Integration | Component | list', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.setProperties({
      downloadAction: () => {
        this.set('isDownloaded', true);
      },
      items: getMockModel(),
      headerCells: ['name', 'device', 'path', 'status'],
    });
  });

  test('it renders', async function (assert) {
    await render(
      hbs`{{list items=this.items downloadAction=(action this.downloadAction)}}`
    );

    assert.dom('.controls').exists(
      {
        count: 1,
      },
      'controls exist'
    );

    assert.equal(
      document.querySelector('.controls .checkbox-component span').innerText,
      'None Selected',
      'Selection text is correct'
    );

    assert.dom('.list-item').exists(
      {
        count: 5,
      },
      'rows initialized as expected'
    );

    assert.dom('.header').doesNotExist("header shouldn't be here");
  });

  test('it renders -- with header', async function (assert) {
    await render(
      hbs`{{list headerCells=this.headerCells items=this.items downloadAction=(action this.downloadAction)}}`
    );

    assert.dom('.header h4').exists(
      {
        count: 5,
      },
      'header initialized as expected'
    );
  });

  test('selection', async function (assert) {
    await render(
      hbs`{{list headerCells=this.headerCells items=this.items downloadAction=(action this.downloadAction)}}`
    );

    await click('.checkbox.disabled');

    assert.equal(
      document.querySelector('.controls .checkbox-component span').innerText,
      'None Selected',
      "Clicking unavailable file doesn't select it"
    );

    await click('.list-item + .list-item');
    assert.equal(
      document.querySelector('.controls .checkbox-component span').innerText,
      'Selected 1',
      'Selecting 1 available file sets the text accordingly'
    );

    await click('.list-item + .list-item');
    assert.equal(
      document.querySelector('.controls .checkbox-component span').innerText,
      'None Selected',
      'Clicking it again deselects it'
    );

    await click('.controls .checkbox-component ');
    assert.dom('.list-item .checkbox.selected').exists(
      {
        count: 2,
      },
      'clicking select all selects the 2 available files'
    );

    await click('.controls .checkbox-component ');
    assert
      .dom('.list-item .checkbox.selected')
      .doesNotExist('clicking it again deselects all files');
  });

  test('1 item is selected and select all is clicked', async function (assert) {
    await render(
      hbs`{{list items=this.items downloadAction=(action this.downloadAction)}}`
    );

    await click('.list-item + .list-item');
    assert.equal(
      document.querySelector('.controls .checkbox-component span').innerText,
      'Selected 1',
      'Selecting 1 available file sets the text accordingly'
    );

    await click('.controls .checkbox-component ');
    assert.dom('.list-item .checkbox.selected').exists(
      {
        count: 2,
      },
      'clicking select all selects the other available files'
    );

    await click('.controls .checkbox-component ');
    assert
      .dom('.list-item .checkbox.selected')
      .doesNotExist('clicking it again deselects all files');
  });

  test('download button works', async function (assert) {
    await render(
      hbs`{{list items=this.items downloadAction=(action this.downloadAction)}}`
    );

    await click('.list-item + .list-item');
    assert.equal(
      document.querySelector('.controls .checkbox-component span').innerText,
      'Selected 1',
      'One item selected'
    );

    await click('.controls .button');
    assert.true(this.isDownloaded, 'action was called');
  });
});
