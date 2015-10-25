// Version 1
//TODO: add Naisone Icon as App Icon
//TODO: nicer Tray Icon

// Version 2
//TODO: make shortcuts configurable in settings of app

'use strict';
var app = require('app');
var Tray = require('tray');
var BrowserWindow = require('browser-window');
var globalShortcut = require('global-shortcut');

var mainWindow = null;
var tray = null;

app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function () {

  var showMenu = true;

  mainWindow = new BrowserWindow({
    width: 460,
    height: 460,
    "node-integration": false
  });

  registerShortcuts();

  mainWindow.loadUrl('file://' + __dirname + '/index.html');
  mainWindow.webContents.on('did-finish-load', function () {
    mainWindow.setTitle('Naisone\'s Trello Quick Add');
  });
  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  ////////////////////////// Implementation Details

  function registerShortcuts() {
    // Register a 'cmd+alt+k' shortcut listener for Mac
    if (process.platform == 'darwin') {
      globalShortcut.register('cmd+alt+k', function () {
        console.log('cmd+alt+k is pressed');
        toggle();
      });
      //TODO Tray does not work - why? electron . does work. On electron-packager it does not work
      var trayMacPath = __dirname + '/assets/images/naisone-trello-quick-add-logo.png';
       tray = new Tray(trayMacPath);
       tray.on('clicked', function () {
       toggle();
       });
    }

    // Register a 'ctrl+alt+a' shortcut listener for Windws/Mac
    globalShortcut.register('ctrl+alt+a', function () {
      console.log('ctrl+alt+a is pressed');
      toggle();
    });
  }

  function toggle() {
    showMenu = !showMenu;
    showMenu ? mainWindow.show() : mainWindow.hide();
  }

});

app.on('will-quit', function () {
  // Unregister all shortcuts.
  globalShortcut.unregisterAll();
});
