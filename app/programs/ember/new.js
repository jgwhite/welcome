export default function emberNew(name) {
  this.cwd()[name] = {
    app: {
      'app.js': '',
      'components': {},
      'controllers': {},
      'helpers': {},
      'index.html': '',
      'models': {},
      'router.js': '',
      'routes': {},
      'styles': {
        'app.css': ''
      },
      'templates': {
        'application.hbs': '{{outlet}}',
        'components': {}
      }
    },
    'bower.json': '',
    'config': {
      'environment.js': ''
    },
    'ember-cli-build.js': '',
    'package.json': ''
  };

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
