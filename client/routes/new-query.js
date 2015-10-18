var fs = require('fs')
var path = require('path')
var xhr = require('xhr')

var includes = []
var excludes = []

module.exports = {
  url: '/query',
  data: function (params, cb) {
    cb({
      includes: includes,
      excludes: excludes
    })
  },
  template: fs.readFileSync(path.join(__dirname, '../templates/new-query.html')).toString(),
  onrender: function () {
    var self = this
    function Keyword (value) {
      return {value: value}
    }

    self.on('include', function (event) {
      var value = self.get('newInclude')
      includes.push(Keyword(value))
      self.set('newInclude', null)
      event.original.preventDefault()
    })

    self.on('exclude', function (event) {
      var value = self.get('newExclude')
      excludes.push(Keyword(value))
      self.set('newExclude', null)
      event.original.preventDefault()
    })

    self.set('sql', "select * from tweets where text match '*@theinternetthing'")

    self.on('done', function () {
      var data = {
        params: {
          includes: self.get('includes'),
          excludes: self.get('excludes')
        }
      }
      var opts = {
        uri: '/api/queries',
        method: 'POST',
        json: data
      }
      xhr(opts, function (err, resp, body) {
        if (err) console.error(err)
        self.set('includes', [])
        self.set('excludes', [])
      })
    })
  }
}
