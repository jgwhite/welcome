import Ember from 'ember';
import computed, { empty } from 'ember-computed-decorators';
const { run } = Ember;

export default Ember.Object.extend({
  prompt: '$ ',
  command: '',
  result: null,
  caret: 0,
  shouldBlink: false,

  @computed('command', 'caret')
  pre: (command, caret) => command.substring(0, caret),

  @computed('command', 'caret')
  post: (command, caret) => command.substring(caret),

  @empty('command')
  isEmpty,

  append(str) {
    let pre = this.get('pre');
    let post = this.get('post');
    let caret = this.get('caret') + str.length;
    let command = pre + str + post;

    this.set('command', command);
    this.set('caret', caret);
  },

  del() {
    if (this.get('isEmpty')) { return; }

    let caret = this.get('caret') - 1;
    let pre = this.get('pre').substring(0, caret);
    let post = this.get('post');
    let command = pre + post;

    this.set('command', command);
    this.set('caret', caret);
  },

  left() {
    let min = 0;
    let caret = this.get('caret');

    caret -= 1;
    caret = Math.max(min, caret);

    this.set('caret', caret);
  },

  right() {
    let max = this.get('command.length');
    let caret = this.get('caret');

    caret += 1;
    caret = Math.min(caret, max);

    this.set('caret', caret);
  },

  start() {
    this.set('caret', 0);
  },

  end() {
    this.set('caret', this.get('command.length'));
  }
});
