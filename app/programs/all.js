import Ember from 'ember';
const { isEmpty } = Ember;

const programs = {
  echo(...args) {
    return args.join(' ');
  },

  pwd() {
    return this.path;
  },

  which(name) {
    return `/usr/local/bin/${name}`;
  },

  ember(command, ...args) {
    if (isEmpty(command)) {
      command = 'help';
    }

    let program = ember[command];

    if (program) {
      return program(...args);
    } else {
      return `The specified command ${command} is invalid. For available options, see \`ember help\`.`;
    }
  },

  date() {
    return new Date().toLocaleString();
  },

  cd(path) {
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
};

const ember = {
  version() {
    return [
      'version: 1.13.13',
      'node: 5.1.0',
      'npm: 2.14.10',
      'os: Welcome OS 1.0.0'
    ].join('\n');
  },

  help() {
    return 'Don’t ask...';
  },

  new(name) {
    return `version 1.13.13
  create .bowerrc
  create .editorconfig
  create .ember-cli
  create .jshintrc
  create .travis.yml
  create .watchmanconfig
  create README.md
  create app/app.js
  create app/components/.gitkeep
  create app/controllers/.gitkeep
  create app/helpers/.gitkeep
  create app/index.html
  create app/models/.gitkeep
  create app/router.js
  create app/routes/.gitkeep
  create app/styles/app.css
  create app/templates/application.hbs
  create app/templates/components/.gitkeep
  create bower.json
  create config/environment.js
  create ember-cli-build.js
  create .gitignore
  create package.json
  create public/crossdomain.xml
  create public/robots.txt
  create testem.json
  create tests/.jshintrc
  create tests/helpers/destroy-app.js
  create tests/helpers/module-for-acceptance.js
  create tests/helpers/resolver.js
  create tests/helpers/start-app.js
  create tests/index.html
  create tests/integration/.gitkeep
  create tests/test-helper.js
  create tests/unit/.gitkeep
  create vendor/.gitkeep`;
  }
};

export default programs;
