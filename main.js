const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu} = electron;

const DEVELOPER = 0;

let mainWindow;

app.on('ready', function() {
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol:'file',
        slashes: true
    }));

    mainWindow.on('closed', function(){
        app.quit();
    });

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

const mainMenuTemplate = [
    {
        label: 'Quit',
        accelerator: process.platform == 'darwain' ? 'Command+Q' :
        'Ctrl+Q',
        click(){
        app.quit();
        }
    }
];

if (process.platform == 'darwin'){
    mainMenuTemplate.unshift({});
}

if (DEVELOPER !== 0){
    mainMenuTemplate.push({
        label: 'Dev Tools',
        submenu: [
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwain' ? 'Command+I' :
                'Ctrl+I',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                label: 'Reload',
                accelerator: process.platform == 'darwain' ? 'Command+F' :
                'Ctrl+F',
                role: 'reload'
            }
        ]
    })
}