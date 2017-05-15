const Generator = require('yeoman-generator')
const _ = require('lodash')
const chalk = require('chalk')

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts)

    this.argument('viewName', { type: String, required: false })

    if (this.options.viewName) {
      this.viewName = _.upperFirst(_.camelCase(this.options.viewName))
    }
  }

  prompting() {
    const prompts = []

    if (!this.options.viewName) {
      prompts.push({
        type: 'input',
        name: 'viewName',
        message: 'What would like to name this View?',
        validate: (input) => {
          if (input.length <= 0) {
            return 'You must provide a view name'
          }
          return true
        }
      })
    }

    return this.prompt(prompts).then((answers) => {
      if (answers.viewName) {
        this.viewName = _.upperFirst(_.camelCase(answers.viewName))
      }
    })
  }

  write() {
    // Copy component template
    this.fs.copyTpl(
      this.templatePath('component.js'),
      this.destinationPath(`src/views/${this.viewName}/component.js`),
      {
        viewName: this.viewName
      }
    )

    // Copy style template
    this.fs.copyTpl(
      this.templatePath('styles.scss'),
      this.destinationPath(`src/views/${this.viewName}/styles.scss`),
      {
        viewName: this.viewName
      }
    )

    // Copy Container template
    this.fs.copyTpl(
      this.templatePath('container.js'),
      this.destinationPath(`src/views/${this.viewName}/container.js`),
      {
        viewName: this.viewName
      }
    )

    // Copy Test template
    this.fs.copyTpl(
      this.templatePath('__tests__/component.test.js'),
      this.destinationPath(`src/views/${this.viewName}/__tests__/component.test.js`),
      {
        viewName: this.viewName
      }
    )
  }
}
