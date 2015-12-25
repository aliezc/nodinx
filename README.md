# Nodinx

A simple http-proxy server by Node.js

## Install

```
npm install nodinx
```

## Config

Edit config.json to setting you proxy server.

Format:

*"hostname": {"address": "127.0.0.1", "port": 8080}*

Example:

```
{"example.com": {"address": "127.0.0.1", "port": 8080}}
```

## Usage

```
node nodinx [listen_port]
```

PS: If not prompt the listen_port, default used 80 port.

## Other

*This version has some bug, I will update in a moment.*