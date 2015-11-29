import Ember from 'ember';
import Line from 'welcome/models/line';
import { reads } from 'ember-computed-decorators';
const { run } = Ember;
const DELAY_BEFORE_BLINK = 250;

export default Ember.Component.extend({
  tagName: 'welcome-terminal',

  lines: null,
  shouldBlink: false,

  init() {
    this._super(...arguments);
    this.lines = [Line.create()];
  },

  @reads('lines.lastObject')
  current,

  didInsertElement() {
    this._keyDown = run.bind(this, 'keyDown');
    this._keyPress = run.bind(this, 'keyPress');
    window.addEventListener('keydown', this._keyDown);
    window.addEventListener('keypress', this._keyPress);
    this._blink = run.later(this, 'startBlink', DELAY_BEFORE_BLINK);
  },

  willDestroyElement() {
    window.removeEventListener('keydown', this._keyDown);
    window.removeEventListener('keypress', this._keyPress);
  },

  keyDown(event) {
    console.log(`keyDown: ${keySignature(event)}`);

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
      default        : return;
    }

    event.preventDefault();
  },

  keyPress(event) {
    event.preventDefault();

    console.log(`keyPress: ${keySignature(event)}`);

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
    let [operator, ...operands] = command.split(' ');

    switch (operator) {
      case '':
        break;
      case 'echo':
        line.set('result', operands.join(' '));
        break;
      case 'pwd':
        line.set('result', '/home/ember');
        break;
      case 'ember':
        line.set('result', [
          'version: 1.13.13',
          'node: 5.1.0',
          'npm: 2.14.10',
          'os: welcome-os'
        ].join('\n'));
        break;
      default:
        line.set('result', `${command}: command not found`);
        break;
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

    run.cancel(this._blink);
    this._blink = run.later(this, 'startBlink', DELAY_BEFORE_BLINK);
  },

  startBlink() {
    this.set('shouldBlink', true);
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
