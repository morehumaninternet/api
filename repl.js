#!/usr/local/bin/node


const fs = require('fs')
const repl = require("repl")
const context = repl.start().context

context.streamClient = require('./compiled/streamClient').default
