const Generator = require('yeoman-generator')
const _ = require('lodash')
const chalk = require('chalk')

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts)

    this.argument('componentName', { type: String, required: false })

    if (this.options.componentName) {
      this.componentName = _.upperFirst(_.camelCase(this.options.componentName))
    }
  }

  prompting() {
    const prompts = []

    if (!this.options.componentName) {
      prompts.push({
        type: 'input',
        name: 'componentName',
        message: 'What would like to name this Component?',
        validate: (input) => {
          if (input.length <= 0) {
            return 'You must provide a component name'
          }
          return true
        }
      })
    }

    if (!this.config.get('promptValues') || !this.config.get('promptValues').projectCSSPrefix) {
      prompts.push({
        type: 'input',
        name: 'projectCSSPrefix',
        message: [
          'What would you like the CSS prefix for this project to be?',
          chalk.dim('This should be a simple 2 or 3 character key (ie. TP or TES).'),
          chalk.dim('NOTE: This value will be set once and ' +
                    'stored for all components in the project.')
        ].join('\n'),
        store: true, // This value will be stored for the project once initially set
        validate: (input) => {
          const MAX_CHARS = 3
          const MIN_CHARS = 2
          if (!/^[^a-z\s]+$/.test(input)) {
            return 'Your key must be all caps and have no spaces'
          }
          if (input.length > MAX_CHARS || input.length < MIN_CHARS) {
            return 'Your key must be 2 or 3 characters'
          }
          return true
        }
      })
    }

    prompts.push({
      type: 'list',
      name: 'componentType',
      message: [
        'What type of component is this?',
        chalk.dim('Full: Yes state. Yes Lifecycle.')
      ].join('\n'),
      default: 0,
      choices: [
        'Full'
      ],
      filter(val) {
        return val.toLowerCase()
      }
    })

    return this.prompt(prompts).then((answers) => {
      if (answers.componentName) {
        this.componentName = _.upperFirst(_.camelCase(answers.componentName))
      }

      this.componentType = answers.componentType
      this.projectCSSPrefix = answers.projectCSSPrefix
                                || this.config.get('promptValues').projectCSSPrefix
    })
  }

  write() {
    // Copy component template
    this.fs.copyTpl(
      this.templatePath(`index.${this.componentType}.js`),
      this.destinationPath(`src/components/${this.componentName}/index.js`),
      {
        componentName: this.componentName,
        projectCSSPrefix: this.projectCSSPrefix
      }
    )

    // Copy style template
    this.fs.copyTpl(
      this.templatePath('styles.scss'),
      this.destinationPath(`src/components/${this.componentName}/styles.scss`),
      {
        componentName: this.componentName,
        projectCSSPrefix: this.projectCSSPrefix
      }
    )

    // Copy Test template
    this.fs.copyTpl(
      this.templatePath('__tests__/index.test.js'),
      this.destinationPath(`src/components/${this.componentName}/__tests__/index.test.js`),
      {
        componentName: this.componentName
      }
    )
  }
}
