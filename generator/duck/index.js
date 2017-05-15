const Generator = require('yeoman-generator')
const _ = require('lodash')
const chalk = require('chalk')

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts)

    this.argument('duckName', { type: String, required: false })

    if (this.options.duckName) {
      this.duckName = _.camelCase(this.options.duckName)
    }
  }

  prompting() {
    const prompts = []

    if (!this.options.duckName) {
      prompts.push({
        type: 'input',
        name: 'duckName',
        message: 'What would like to name this Duck?',
        validate: (input) => {
          if (input.length <= 0) {
            return 'You must provide a duck name'
          }
          return true
        }
      })
    }

    if (!this.config.get('promptValues') || !this.config.get('promptValues').projectActionPrefix) {
      prompts.push({
        type: 'input',
        name: 'projectActionPrefix',
        message: [
          'What would you like the Action prefix for this project to be?',
          chalk.dim('This should be a simple string (ie. project).'),
          chalk.dim('NOTE: This value will be set once and stored for all ducks in the project.')
        ].join('\n'),
        store: true, // This value will be stored for the project once initially set
        validate: (input) => {
          if (!/^[^A-Z\s]+$/.test(input)) {
            return 'Your key must be all lowercase and have no spaces'
          }
          return true
        }
      })
    }

    prompts.push({
      type: 'confirm',
      name: 'hasFetch',
      message: [
        'Will this duck fetch any state from an API?'
      ].join('\n'),
      default: true,
      filter(val) {
        return val.toLowerCase()
      }
    })

    return this.prompt(prompts).then((answers) => {
      if (answers.duckName) {
        this.duckName = _.camelCase(answers.duckName)
      }

      this.projectActionPrefix = answers.projectActionPrefix
                                  || this.config.get('promptValues').projectActionPrefix
      this.componentType = answers.componentType
      this.hasFetch = answers.hasFetch
    })
  }

  write() {
    const duckTemplateType = (this.hasFetch) ? 'fetch' : 'plain'

    // Copy duck template
    this.fs.copyTpl(
      this.templatePath(`duck.${duckTemplateType}.js`),
      this.destinationPath(`src/store/${this.duckName}/duck.js`),
      {
        duckName: this.duckName,
        projectActionPrefix: this.projectActionPrefix
      }
    )

    // Copy duck test template
    this.fs.copyTpl(
      this.templatePath(`__tests__/duck.${duckTemplateType}.test.js`),
      this.destinationPath(`src/store/${this.duckName}/__tests__/duck.test.js`),
      {
        duckName: this.duckName
      }
    )

    if (this.hasFetch) {
      // Copy api template
      this.fs.copyTpl(
        this.templatePath('api.js'),
        this.destinationPath(`src/store/${this.duckName}/api.js`),
        {
          duckName: this.duckName
        }
      )

      // Copy api test template
      this.fs.copyTpl(
        this.templatePath('__tests__/api.test.js'),
        this.destinationPath(`src/store/${this.duckName}/__tests__/api.test.js`),
        {
          duckName: this.duckName
        }
      )
    }
  }
}
