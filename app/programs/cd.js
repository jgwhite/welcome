import Ember from 'ember';
const { isEmpty } = Ember;

export default function cd(path) {
  let oldParts = this.path.split('/').reject(isEmpty);
  let newParts = path.split('/').reject(isEmpty);
  let parts;

  if (path[0] === '/') {
    parts = newParts;
  } else {
    parts = oldParts.concat(newParts);
  }

  let idx = 0;

  while (idx < parts.length) {
    if (parts[idx] === '..') {
      parts.splice(idx - 1, 2);
      idx--;
    } else if (parts[idx] === '.') {
      parts.splice(idx, 1);
    } else {
      idx++;
    }
  }

  this.path = '/' + parts.join('/');
}
