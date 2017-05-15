const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts)

    console.log('Set some stuff up')
  }

  doSomething() {
    console.log('Do something')
  }
}
