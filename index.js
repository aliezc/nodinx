"use strict"

var http = require("http")
var cli = require("cli2obj")
var fs = require("fs")
var proxy = require("./lib/proxy.js")
var path = require("path")

// convert cli args
var clicmd = cli.parseFlat(["port"])

if(!clicmd.port){
	console.log("no prompt port, use 80 port")
	clicmd.port = 80
}

// read hosts config file
fs.readFile(path.parse(module.filename).dir + "/config.json", function(err, host_buf){
	// if read config file error, exit the program
	if(err){
		console.log("read config file error")
		process.exit(-1)
	}
	
	// add hosts to proxy server
	var hosts = JSON.parse(host_buf.toString())
	var count = 0
	for(var hn in hosts){
		proxy.add(hn, hosts[hn].address, hosts[hn].port)
		count++
	}
	
	console.log("proxy is start for " + count + " web sites, listen on " + (clicmd.port || 80) + " port...")
	
	proxy.listen(clicmd.port || 80)
})