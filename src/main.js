/**
 * @constant {BrowserWindow,Menu,app}
 * Browserwindow: para la creación de ventas.
 * Menu: para perzonalización del menu por defecto. 
 * app: para llamar funciones nativas de la aplicación
 */
const { BrowserWindow, Menu, app } = require('electron');

/**
 * @var window alamacen la venta principal. 
 * @var windowinf alamacen la venta secundaria que es llamdos del menu.
 */
let window;
let windowinf;


/**
 * @function createWindow crea la venta principal. con sus dimensiones establaceidas width,heigth. 
 * @param {templateMenu,mainMenu} plantilla del menu.
 * 
 */
function createWindow() {
    window = new BrowserWindow({
        width: 1400,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    })
    window.loadFile('src/ui/index.html'); //renderisa el documento index.html que contiene la ventana principal
    const mainMenu = Menu.buildFromTemplate(templateMenu); //implementa el menu personalizado
    Menu.setApplicationMenu(mainMenu);
    window.on('closed', () => {
        app.quit(); //cierra todo el programa
    })

};

/**
 * @function information //crea la ventana secundaria. 
 * 
 */
function information() {
    windowinf = new BrowserWindow({
        width: 1000,
        height: 600,
    })
    windowinf.setMenu(null); //elimana el menu por defecto
    windowinf.loadFile('src/ui/informacion.html'); //rendiraza el segundo html
    windowinf.on('closed', () => {
        windowinf = null;
    })
}

/**
 * @constant templateMenu menu personalizado.
 */

const templateMenu = [{
    label: 'Opciones',
    submenu: [{
        label: 'Informacion',
        accelerator: 'Ctrl+I',
        click() {
            information()
        }
    }]
}];

if (process.platform === 'darwin') {
    templateMenu.unshift({
        label: app.getName()
    })
}

if (process.env.NOde_ENV !== 'production') {
    templateMenu.push({
        label: 'Herrmientas de Desarrollo',
        submenu: [{
                label: 'Consola',
                accelerator: 'Ctrl+C',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();

                }
            },
            {
                role: 'reload'
            }
        ]
    })
}

/**
 * @exports createWindow funcion para crear ventanas 
 */

module.exports = {
    createWindow
}