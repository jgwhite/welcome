import Ember from 'ember';
import computed, { reads } from 'ember-computed-decorators';
const { run } = Ember;

export default Ember.Component.extend({
  tagName: 'welcome-console',

  lines: null,

  init() {
    this._super(...arguments);
    this.lines = [Line.create()];
  },

  @reads('lines.lastObject') current,

  didInsertElement() {
    this._keyDown = run.bind(this, 'keyDown');
    this._keyPress = run.bind(this, 'keyPress');
    window.addEventListener('keydown', this._keyDown);
    window.addEventListener('keypress', this._keyPress);
  },

  willDestroyElement() {
    window.removeEventListener('keydown', this._keyDown);
    window.removeEventListener('keypress', this._keyPress);
  },

  keyDown(event) {
    switch (event.which) {
      case 8:
        event.preventDefault();
        this.del();
        break;
      case 13:
        event.preventDefault();
        this.newline();
        break;
    }
  },

  keyPress(event) {
    event.preventDefault();
    this.append(String.fromCharCode(event.which));
  },

  append(str) {
    let content = this.get('current.content');
    content += str;
    this.set('current.content', content);
  },

  del() {
    let content = this.get('current.content');
    content = content.substr(0, content.length - 1);
    this.set('current.content', content);
  },

  newline() {
    this.lines.pushObject(Line.create());
  }
});

const Line = Ember.Object.extend({
  prompt: '$ ',
  content: ''
});
