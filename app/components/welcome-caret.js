import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'welcome-caret',
  classNameBindings: ['blink'],
  blink: false
});
