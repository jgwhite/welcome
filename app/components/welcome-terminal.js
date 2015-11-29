import Ember from 'ember';
import Line from 'welcome/models/line';
import programs from 'welcome/programs/all';
import { readOnly } from 'ember-computed-decorators';
const { run } = Ember;
const DELAY_BEFORE_BLINK = 250;

export default Ember.Component.extend({
  tagName: 'welcome-terminal',

  lines: null,
  shouldBlink: false,
  path: '/home/ember',

  init() {
    this._super(...arguments);
    this.lines = [Line.create()];
  },

  @readOnly('lines.lastObject')
  current,

  didInsertElement() {
    this._keyDown = run.bind(this, 'keyDown');
    this._keyPress = run.bind(this, 'keyPress');

    window.addEventListener('keydown', this._keyDown);
    window.addEventListener('keypress', this._keyPress);

    this.scheduleStartBlink();
  },

  willDestroyElement() {
    window.removeEventListener('keydown', this._keyDown);
    window.removeEventListener('keypress', this._keyPress);
  },

  keyDown(event) {
    this.stopBlink();

    switch (keySignature(event)) {
      case '8'       : this.del();     break;
      case '13'      : this.newline(); break;
      case '37'      : this.left();    break;
      case '38'      : this.up();      break;
      case '39'      : this.right();   break;
      case '40'      : this.down();    break;
      case 'ctrl+65' : this.start();   break;
      case 'ctrl+69' : this.end();     break;
      case 'ctrl+76' : this.clear();   break;
      default        : return;
    }

    event.preventDefault();

    this.scheduleScrollToCurrent();
  },

  keyPress(event) {
    event.preventDefault();

    this.append(String.fromCharCode(event.which));
  },

  append(str) {
    this.get('current').append(str);
  },

  del() {
    this.get('current').del();
  },

  newline() {
    this.evaluate();
    this.lines.pushObject(Line.create());
  },

  evaluate() {
    let line = this.get('current');
    let command = line.get('command');
    let [name, ...args] = command.split(' ');
    let program = programs[name];

    if (program) {
      let result = program.call(this, ...args);
      line.set('result', result);
    } else if (name.length) {
      line.set('result', `${name}: command not found`);
    }
  },

  left() {
    this.get('current').left();
  },

  right() {
    this.get('current').right();
  },

  start() {
    this.get('current').start();
  },

  end() {
    this.get('current').end();
  },

  up() {
  },

  down() {
  },

  stopBlink() {
    this.set('shouldBlink', false);
    this.scheduleStartBlink();
  },

  scheduleStartBlink() {
    run.cancel(this._blink);
    this._blink = run.later(this, 'startBlink', DELAY_BEFORE_BLINK);
  },

  startBlink() {
    this.set('shouldBlink', true);
  },

  scheduleScrollToCurrent() {
    run.schedule('afterRender', this, 'scrollToCurrent');
  },

  clear() {
    this.set('lines', [Line.create()]);
  },

  scrollToCurrent() {
    let scrollTop = this.$().scrollTop();
    let currentEl = this.$('> *:last');
    let y = scrollTop + currentEl.offset().top;

    this.$().scrollTop(y);
  }
});

function keySignature(event) {
  let result = [];

  if (event.ctrlKey) { result.push('ctrl'); }
  if (event.shiftKey) { result.push('shift'); }
  if (event.altKey) { result.push('alt'); }

  result.push(event.which);

  return result.join('+');
}
