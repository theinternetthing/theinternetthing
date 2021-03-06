var xhr = require('xhr')

function REST (model) {
  if (!(this instanceof REST)) return new REST(model)
  this.url = '/api/' + model
}

REST.prototype.get = function (id, cb) {
  var opts = {
    url: this.url + '/' + id,
    method: 'GET',
    json: true
  }

  xhr(opts, cb)
}

REST.prototype.all = function (cb) {
  var opts = {
    url: this.url,
    method: 'GET',
    json: true
  }

  xhr(opts, cb)
}

REST.prototype.post = function (data, cb) {
  if (data.id) return this.put(data, cb)
  var opts = {
    url: this.url,
    method: 'POST',
    json: data
  }

  xhr(opts, cb)
}

REST.prototype.put = function (data, cb) {
  var url = data.id ? this.url + '/' + data.id : this.url
  var opts = {
    url: url,
    method: 'PUT',
    json: data
  }

  xhr(opts, cb)
}

REST.prototype.delete = function (id, cb) {
  var opts = {
    url: this.url + '/' + id,
    method: 'DELETE',
    json: true
  }

  xhr(opts, cb)
}

REST.prototype.call = function (method, path, data, cb) {
  if (typeof data === 'function') return this.call(method, path, null, data)

  var opts = {
    url: this.url + '/' + path,
    method: method,
    json: data || true
  }

  xhr(opts, cb)
}

module.exports = REST
