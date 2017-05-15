const Generator = require('yeoman-generator')
const _ = require('lodash')
const chalk = require('chalk')

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts)

    this.argument('generatorName', { type: String, required: false })

    if (this.options.generatorName) {
      this.generatorName = _.kebabCase(this.options.generatorName)
    }
  }

  prompting() {
    const prompts = []

    if (!this.options.generatorName) {
      prompts.push({
        type: 'input',
        name: 'generatorName',
        message: 'What would like to name this generator?',
        validate: (input) => {
          if (input.length <= 0) {
            return 'You must provide a generator name'
          }
          return true
        }
      })
    }

    return this.prompt(prompts).then((answers) => {
      if (answers.generatorName) {
        this.generatorName = _.kebabCase(answers.generatorName)
      }
    })
  }

  write() {
    this.fs.copy(
      this.templatePath('index.js'),
      this.destinationPath(`generator/${this.generatorName}/index.js`)
    )
  }

  updatePackageJSON() {
    const pkgPath = this.destinationPath('package.json')
    const pkg = require(pkgPath)
    const commandString = `generate:${this.generatorName}`
    const command = `./node_modules/.bin/yo ./generator/${this.generatorName}`

    console.log([
      `${chalk.green('Heads Up:')} We will update your package.json with the appropriate`,
      '\'npm run\' command for this generator. You will need to accept',
      'the conflict below to do so.',
      '',
      'You will be able to run this generator with the following command:',
      '',
      `${chalk.dim('$')} npm run ${commandString}`,
      ''
    ].join('\n'))

    pkg.scripts[commandString] = command

    this.fs.writeJSON(pkgPath, pkg)
  }
}
