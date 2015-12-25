"use strict"

var http = require("http")

// main proxy obj
var proxy = {
	_host: {},
	
	// add host proxy
	add: function(host, addr, port){
		this._host[host] = {"address": addr, "port": port}
	},
	
	// start a http server and listen
	listen: function(port){
		var hostlist = this._host
		http.createServer(function(req, res){
			var hostname = req.headers.host
			if(hostname in hostlist){
				var request = {
					"host": hostlist[hostname].address,
					"hostname": hostname,
					"port": hostlist[hostname].port,
					"method": req.method,
					"headers": req.headers
				}
				
				var remote_req = http.request(request, function(resp){
					res.writeHead(resp.statusCode, resp.headers)
					resp.pipe(res)
				})
				
				req.pipe(remote_req)
			}
		}).listen(port || 80)
	}
}

module.exports = proxy