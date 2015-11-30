import Ember from 'ember';
const { isEmpty } = Ember;
import help from './ember/help';
import emberNew from './ember/new';
import version from './ember/version';

const commands = {
  help,
  new: emberNew,
  version
};

export default function ember(command, ...args) {
  if (isEmpty(command)) {
    command = 'help';
  }

  let program = commands[command];

  if (program) {
    return program.call(this, ...args);
  } else {
    return `The specified command ${command} is invalid. For available options, see \`ember help\`.`;
  }
}

