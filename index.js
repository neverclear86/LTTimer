"use strict"

const electron = require('electron')
// Module to control application life.
const app = electron.app
const protocol = electron.protocol
// Module to create native browser window.m
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

let mainWindow
app.on('ready', () => {
  mainWindow = new BrowserWindow({width: 800, height: 600})

  mainWindow.loadURL(url.format({
    pathname: 'docs/index.html',
    protocol: 'file:',
    slashes: true
  }))

  mainWindow.on('closed', function () {
    mainWindow = null
  })

  // 絶対パス修正
  protocol.interceptFileProtocol('file', (req, callback) => {
    const requestedUrl = req.url.substr(7)
    console.log(requestedUrl)
    if (path.isAbsolute(requestedUrl)) {
      callback(path.normalize(path.join(__dirname, requestedUrl)))
    } else {
      callback(requestedUrl)
    }
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
