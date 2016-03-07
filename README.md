#Naisone Trello Quick Add

Productivity app for quick adding cards to a Trelloboard. 
Just press  `cmd+ctrl+k` on a Mac or `ctrl+alt+a` on Windows (and Mac).

Initial Date: BS 25.10.2015

## Important Notes
Git Repo   
https://bitbucket.org/naisone/052-trello-quick-add

Trello
https://trello.com/b/xlDnHO8Z/052-naisone-electron-trello-quick-add

Serving in Browser run `gulp serve`
Serving as Electron App run `gulp`

### Project Information

based on `generator-gulp-angular`  
https://github.com/Swiip/generator-gulp-angular

To build an Electron package we use https://github.com/maxogden/electron-packager  
   
Easier to copy paste: (DEPRECATED: the new command can be seen inside build.js and includes setting the app's icon)  
 electron-packager . "Naisone Trello Quick Add" --platform=all --arch=x64 --version=0.34.0 --overwrite  
 electron-packager . "Naisone Trello Quick Add" --platform=darwin --arch=x64 --version=0.34.0 --overwrite  
 electron-packager dist "Naisone Trello Quick Add" --platform=darwin --arch=x64 --version=0.34.0 --overwrite  
 electron-packager . "Naisone Trello Quick Add" --platform=win32 --arch=x64 --version=0.34.0 --overwrite  

## Test coverage
The application has a quite good test coverage (it is very small though - one controller, one service). To run the tests enter `karma start` or via gulp `gulp test:auto`.

##Build Process

The Gulp process has been changed slightly to automatically build the electron executables into the `executables` folder. The default task is now `build-electron` 
 (was `build`). Internally the build-electron task performs some gulp-shell commands after the build to package the electron app and directly start the Mac application (needs to be changed when working on a Win machine!) 

run `gulp` which builds the `dist` folder and packages the executables in an Electron container as well

##How to make a `gulp-angular` project ready for Electron
1. to have the Angular App electron-ready the package.json needs to some basice Electron specific information 
  `{
    "name": "NaisoneElectronTrelloTodo",
    "version": "0.0.0",
    "main": "electron-main.js",
    ...more stuff
  }`
  **Info**: the file can consists of far more definitions, like devDependencies, dependencies etc.
  
2. additionally the start file for electron `electron-main.js` needs to be defined  

That's it!

##Lessons Learned
1. When using $templateCache instead of raw HTML files, check if your URL's inside the $stateProvider have the format `app/todo/todo.html` instead of `./app.todo.todo.html` or `/app/todo/todo.html`. While serving your src it will work regardless of the format. But bundling the HTMl files into the $templateCache (which happens due to `gulp build`) the URL's are breaking.
2. **UPDATE: included gulp-shell as I couldn't get it to work.** The `gulp build` task already builds the electron app, due to a hint by https://github.com/robrich/gulp-exec. Which recommends not using a further plugin but using child_process. See build.js for more details. 

## Known Problems
1. the file size is very big for Mac OS X (108 MB). I am wondering if Slack uses some compression algorithm (the Slack app has only 6 MB on Mac). See https://discuss.atom.io/t/electron-distribution-filesize/19143 for details.

## Todos
1. add bard.js as test helper
2. add more unit tests
3. add e2e tests, currently it is just the standard generator-gulp-angular e2e test
4. make shortcut for opening quick add window configurable via settings inside the app
5. windows build does not work with setting an app icon, Mac is working
6. further TODOS inside src code
