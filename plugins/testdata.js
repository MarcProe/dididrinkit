import testdata from 'static/testdata.json'

export default ({ app }, inject) => {
  // Inject $testdata() in Vue, context and store.
  inject('testdata', () => {
    return testdata
  })
}
