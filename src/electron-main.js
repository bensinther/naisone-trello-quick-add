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
    width: 500,
    height: 540,
    "node-integration": false
  });

  registerShortcuts();
  hideAppIconInDock();

  mainWindow.loadURL('file://' + __dirname + '/index.html');
  /*mainWindow.on('closed', function () {
   mainWindow = null;
   });*/

  mainWindow.on('close', function() { //   <---- Catch close event

    // The dialog box below will open, instead of your app closing.
    /*require('dialog').showMessageBox({
      message: "Close button has been pressed!",
      buttons: ["OK"]
    });*/
    app.quit();

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
      var trayMacPath = __dirname + '/assets/images/tray-icon.png';
      tray = new Tray(trayMacPath);
      tray.on('click', function () {
        console.log("tray clicked");
        toggle();
      });
    }

    // Register a 'ctrl+alt+a' shortcut listener for Windows/Mac
    globalShortcut.register('ctrl+alt+a', function () {
      console.log('ctrl+alt+a is pressed');
      toggle();
    });
  }

  function toggle() {
    showMenu = !showMenu;
    try {
      showMenu ? mainWindow.show() : mainWindow.hide();
    }
    catch (exception) {
      console.log("error happened: " + exception);
    }
  }

  function hideAppIconInDock() {
    if (process.platform == 'darwin') {
      app.dock.hide();
    }
  }

});

app.on('will-quit', function () {
  // Unregister all shortcuts.
  globalShortcut.unregisterAll();
});
