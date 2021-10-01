import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | list/list-item', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.set('item', {
      isSelected: false,
      isDisabled: false,
    });
    this.set('onSelectionChanged', () => {
      this.set('isSelected', !this.item.isSelected);
    });
  });

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    // Template block usage:
    await render(hbs`
      {{#list/list-item item=this.item onSelectionChanged=(action this.onSelectionChanged)}}
        template block text
      {{/list/list-item}}
    `);

    assert.equal(this.element.textContent?.trim(), 'template block text');
  });
});
