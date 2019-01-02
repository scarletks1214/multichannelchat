if (process.env.NODE_ENV === 'production') {
  // const originalLog = console.log
  // const originalWarn = console.warn
  // const originalError = console.error
  console.log = function() {}
  console.warn = function() {}
  console.error = function() {}
  console.trace = function() {}
  console.assert = function() {}
  window.onerror = function(message, url, lineNumber) {
    return true // prevents browser error messages
  }
}
