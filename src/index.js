/**
 * @function principal: incia la aplicación 
 */
const { createWindow } = require('./main'); //requiere el archivo main y funcionalidades
const { app } = require('electron'); //requiere modulo app de electron

app.allowRendererProcessReuse = false; // verifica el arranque de renderización

app.whenReady().then(createWindow); //verifica si se ha inicializado correctamente la apliación