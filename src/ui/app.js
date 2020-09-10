/**
 * por medio del escuchador de inicio, ejecuta un splas("intro automatico"). con duracion de 4000 mlsegundos.
 */
const splash = document.querySelector('.splash'); //seleccion la clase del componenete del documento html.
document.addEventListener('DOMContentLoaded', (s) => { //funcion escuchador.
        setTimeout(() => {
            splash.classList.add('display-none');
        }, 4000);
    })
    //-----------fin de procedimiento splass

const formulario = document.getElementById('formData'); //se seleccina el id del formulario en documento html
const inputs = document.querySelectorAll('#formData input'); //selcciona todos los ids de los imputos del formulario.

/**
 * Objeto de las expresiones regulares... contiente un las exprsiones validas para el formulario.
 * @object expresiones regulares.
 * @template default
 */
const regularExpression = {
        rEname: /^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/, // Valida nombres que inicien con cualquer letra o vacal, con acento. restricción: Tiene que empezar con mayuscula.
        rEaddress: /^[a-zA-Z0-9\s\.\-]+\,[A-Za-zñáéíóú\s]+\,[A-Za-zñáéíóú\s]+$/, //valida la direccion bajo el formato: calle+ciudad+provincia
        rEpassword: /^.{8,20}$/, // valida password con cualquier caracter mayor a 8 unidades.
        rEmail: /^[a-zA-Z0-9_.+-]+@[a-z0-9-]+\.[a-z0-9-.]+$/, // valida correo con cualquier caracter, posterior a la @ todos son minuscula. 
        rEphone: /^[5,0,2]{3}[4|5|7]{1}([\d]{7})$/, // valida el numero de telefono con el codigo del pais 502
        rEphone2: /^[4|5|7]{1}([\d]{7})$/, // valida el número de telefono sin el codigo del país.
        rEsex: /^([f|m|F|M]{1}[a|e]{1}[c-u]+[n|l]{1}[ino])$/, // valida unicamente las opeciones de femenino ó masculino
        rEdpi: /^[0-9]{4}[0-9]{5}[0-2]{1}[0-9]{1}[0-2]{1}[0-9]{1}$/, // Valida numeros de dpi de 13 digitos, con la restricción de los ultimos 4, que tiene que cumplir con el rango de departamento y municiipio.
        rEdpi2: /^([0-9]{4})\-([0-9]{5})\-([0-2]{1}[0-9]{1}[0-2]{1}[0-9]{1})$/, // // Valida numeros de dpi de 13 digitos, con la restricción de los ultimos 4, que tiene que cumplir con el rango de departamento y municiipio y guion.
        rEnit: /^([0-9]{6,7})\-([0-9]{1})$/, // valida unicamente numeros de 6 a 8 digitos debe incluir un guion.
        rEpostal: /^[0-2]{1}[0-9]{1}[0-2]{1}[0-9]{1}$/, //valida si es correspondiente al rango de municipio y departemento.
        rEdate1: /^(19|20)\d{2}\/(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])$/,
        rEdate2: /^(19|20)\d{2}\-(0[1-9]|1[0-2])\-(0[1-9]|1\d|2\d|3[01])$/,
        rEdate3: /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/, // valida formato de fecha con diagonales.  
        rEdate4: /^(0[1-9]|1\d|2\d|3[01])\-(0[1-9]|1[0-2])\-(19|20)\d{2}$/, // valida formato de fecha con diagonales.
    }
    /**
     * objeto con el estado de cada uno de los campos del formulario. false = no valido, true= valido el dato en el campo
     * @objetc 
     * @param {true,false}
     */
const fields = {
    Ename: false,
    Eaddress: false,
    Epassword: false,
    Email: false,
    Ephone: false,
    Esex: false,
    Edpi: false,
    Enit: false,
    Epostal: false,
    Edatei: false,
    Edatef: false
}

function fieldsdefault() {
    fields.Ename = false,
        fields.Eaddress = false,
        fields.Epassword = false,
        fields.Email = false,
        fields.Ephone = false,
        fields.Esex = false,
        fields.Edpi = false,
        fields.Enit = false,
        fields.Epostal = false,
        fields.Edatei = false,
        fields.Edatef = false
};

function hideOrShowPassword() {
    var password1, check;

    password1 = document.getElementById("inputPassword");
    // password2=document.getElementById("password2");
    check = document.getElementById("ver");

    if (check.checked == true) // Si la checkbox de mostrar contraseña está activada
    {
        password1.type = "text";
    } else // Si no está activada
    {
        password1.type = "password";
    }
}



function hideOrShowDate() {
    var inputdate1, inputdate2, checkdate;
    inputdate1 = document.getElementById("inputDateI");
    inputdate2 = document.getElementById("inputDateF");
    checkdate = document.getElementById("hdate");
    if (checkdate.checked == true) // Si la checkbox de habilitara la herramienta de fecha
    {
        inputdate1.type = "date";
        inputdate2.type = "date";
    } else // Si no está activada
    {
        inputdate1.type = "text";
        inputdate2.type = "text";
    }
}


//cuando el check esta activo
function evaluationDateICheck(dateivalue) {
    const rdi = document.getElementById('resultDateI');
    const df = document.getElementById('inputDateI');
    const dff = document.getElementById('inputDateF');
    if (regularExpression.rEdate1.test(dateivalue) || regularExpression.rEdate2.test(dateivalue)) {
        df.classList.remove("is-invalid");
        df.classList.add("is-valid");
        rdi.style.display = 'none';
        fields.Edatei = true;
        dff.style.display = '';
        console.log('funcionando')
    } else {
        df.classList.remove("is-valid");
        df.classList.add("is-invalid");
        rdi.style.display = '';
        fields.Edatei = false;
        console.log('funcionando else')
    }

};

//check inactivo
function evaluationDateINocheck(dateivalue) {
    const rdi = document.getElementById('resultDateI');
    const df = document.getElementById('inputDateI');
    const dff = document.getElementById('inputDateF');
    if (regularExpression.rEdate3.test(dateivalue) || regularExpression.rEdate4.test(dateivalue)) {
        df.classList.remove("is-invalid");
        df.classList.add("is-valid");
        rdi.style.display = 'none';
        fields.Edatei = true;
        dff.style.display = '';
        console.log('funcionando no check')
    } else {
        df.classList.remove("is-valid");
        df.classList.add("is-invalid");
        rdi.style.display = '';
        fields.Edatei = false;
        console.log('funcionando else no check')
    }

};

//----------------datef
function evaluationDateFCheck(datefvalue) {
    const df = document.getElementById('inputDateF');
    const rdf = document.getElementById('resultDateF');
    if (regularExpression.rEdate1.test(datefvalue) || regularExpression.rEdate2.test(datefvalue)) {
        df.classList.remove("is-invalid");
        df.classList.add("is-valid");
        rdf.style.display = 'none';
        fields.Edatef = true;
        const dateini = document.querySelector('#inputDateI').value;
        const datefin = document.querySelector('#inputDateF').value;
        countdays2(dateini, datefin);
    } else {
        df.classList.remove("is-valid");
        df.classList.add("is-invalid");
        rdf.style.display = '';
        fields.Edatef = false;
    }

};

//check inactivo
function evaluationDateFNocheck(datefvalue) {
    const df = document.getElementById('inputDateF');
    const rdf = document.getElementById('resultDateF');
    if (regularExpression.rEdate3.test(datefvalue) || regularExpression.rEdate4.test(datefvalue)) {
        df.classList.remove("is-invalid");
        df.classList.add("is-valid");
        rdf.style.display = 'none';
        fields.Edatef = true;
        const dateini = document.querySelector('#inputDateI').value;
        const datefin = document.querySelector('#inputDateF').value;
        countdays1(dateini, datefin);
    } else {
        df.classList.remove("is-valid");
        df.classList.add("is-invalid");
        rdf.style.display = '';
        fields.Edatef = false;
    }

};


countdays1 = function(dateini, datefin) {
    const resultdays = document.querySelector('#resultday');
    var aFecha1 = dateini.split('-');
    var aFecha2 = datefin.split('-');
    var fFecha1 = Date.UTC(aFecha1[2], aFecha1[1] - 1, aFecha1[0]);
    var fFecha2 = Date.UTC(aFecha2[2], aFecha2[1] - 1, aFecha2[0]);
    var dif = fFecha2 - fFecha1;
    var dias = Math.floor(dif / (1000 * 60 * 60 * 24));
    var diasabs = Math.abs(dias);
    if (dias == 0) {
        alert('la fecha ingresada es el mismo, ingrese una fecha diferente');
        document.querySelector('#inputDateF').value = '';

    }
    if (dias > 0) {
        resultdays.style.display = '';
        const resulttemplate = ` 
        <h4 class="alert-heading">Resultado de fechas:</h4>
        <p class="mb-0">Faltan: ${dias} dias, para que se cumpla el periodo de tiempo.</p>
        `;
        resultdays.innerHTML = resulttemplate;
    } else if (dias < 0) {
        resultdays.style.display = '';
        const resulttemplate2 = ` 
        <h4 class="alert-heading">Resultado de fechas:</h4>
        <p class="mb-0">El tiempo ha vencido, han transcurrido: ${diasabs} dias.</p>
        `;
        resultdays.innerHTML = resulttemplate2;

    }

};
countdays2 = function(dateini, datefin) {
    const resultdays = document.querySelector('#resultday');
    var aFecha1 = dateini.split('-');
    var aFecha2 = datefin.split('-');
    var fFecha1 = Date.UTC(aFecha1[0], aFecha1[1] - 1, aFecha1[2]);
    var fFecha2 = Date.UTC(aFecha2[0], aFecha2[1] - 1, aFecha2[2]);
    var dif = fFecha2 - fFecha1;
    var dias = Math.floor(dif / (1000 * 60 * 60 * 24));
    var diasabs = Math.abs(dias);
    if (dias == 0) {
        alert('la fecha ingresada es el mismo, ingrese una fecha diferente');
        document.querySelector('#inputDateF').value = '';
    }

    if (dias > 0) {
        resultdays.style.display = '';

        const resulttemplate = ` 
        <h4 class="alert-heading">Resultado de fechas:</h4>
        <p class="mb-0">Faltan: ${dias} dias, para que se cumpla el periodo de tiempo.</p>
        `;
        resultdays.innerHTML = resulttemplate;
    } else if (dias < 0) {
        resultdays.style.display = '';
        const resulttemplate2 = ` 
        <h4 class="alert-heading">Resultado de fechas:</h4>
        <p class="mb-0">El tiempo ha vencido, han transcurrido: ${diasabs} dias.</p>
        `;
        resultdays.innerHTML = resulttemplate2;

    }


};


/**
 * funcicion que por medio de un escuchador, devuel un valor verdadero si el campo a sido validado o false si no se completado.
 * @function true,false
 * @param {target.value} e 
 */
const formValidation = (e) => {
    switch (e.target.name) {
        case "name": //seccion para validar el nombre
            const na = document.getElementById('inputName'); //adquiere e id del input correspondiente.
            const rna = document.getElementById('resultName'); //adquiere el id del label de mensaje de error.
            if (regularExpression.rEname.test(e.target.value)) { //compara el valor del input con el objeto de expresion regular
                na.classList.remove("is-invalid"); //elimana la clase no valido del input
                na.classList.add("is-valid"); //agrega la clase valida al input
                rna.style.display = 'none'; //elimina la clase de vista previa del label erro!.
                fields.Ename = true; // asigna un valor true al estado del input / campo en validacion
            } else {
                na.classList.remove("is-valid"); //eliman la clase valido del input
                na.classList.add("is-invalid"); //agrega la clase no valido al input
                rna.style.display = ''; //muestra el mensaje de error
                fields.Ename = false; //asigna false al estado del campo
            }
            break;
        case "direction": //seccion para validar la direccion
            const d = document.getElementById('inputDirection');
            const rd = document.getElementById('resultDirection');
            if (regularExpression.rEaddress.test(e.target.value)) {
                d.classList.remove("is-invalid");
                d.classList.add("is-valid");
                rd.style.display = 'none';
                fields.Eaddress = true;
            } else {
                d.classList.remove("is-valid");
                d.classList.add("is-invalid");
                rd.style.display = '';
                fields.Eaddress = false;
            }
            break;
        case "mail": //seccion para validar el correo electronico
            const m = document.getElementById('inputMail');
            const rm = document.getElementById('resultMail');
            if (regularExpression.rEmail.test(e.target.value)) {
                m.classList.remove("is-invalid");
                m.classList.add("is-valid");
                rm.style.display = 'none';
                fields.Email = true;
            } else {
                m.classList.remove("is-valid");
                m.classList.add("is-invalid");
                rm.style.display = '';
                fields.Email = false;
            }
            break;
        case "password": //seccion para validar la contraseña
            const pas = document.getElementById('inputPassword');
            const rpas = document.getElementById('resultPassword');
            if (regularExpression.rEpassword.test(e.target.value)) {
                pas.classList.remove("is-invalid");
                pas.classList.add("is-valid");
                rpas.style.display = 'none';
                fields.Epassword = true;
            } else {
                pas.classList.remove("is-valid");
                pas.classList.add("is-invalid");
                rpas.style.display = '';
                fields.Epassword = false;
            }
            break;
        case "sex": //seccion para validar el género
            const s = document.getElementById('inputSex');
            const rs = document.getElementById('resultSex');

            if (regularExpression.rEsex.test(e.target.value)) {
                s.classList.remove("is-invalid");
                s.classList.add("is-valid");
                rs.style.display = 'none';
                fields.Esex = true;
            } else {
                s.classList.remove("is-valid");
                s.classList.add("is-invalid");
                rs.style.display = '';
                fields.Esex = false;
            }
            break;

        case "dpi": //seccion para validar el número de dpi
            const dp = document.getElementById('inputDpi');
            const rdp = document.getElementById('resultDpi');
            if (regularExpression.rEdpi.test(e.target.value) || regularExpression.rEdpi2.test(e.target.value)) {
                dp.classList.remove("is-invalid");
                dp.classList.add("is-valid");
                rdp.style.display = 'none';
                fields.Edpi = true;

            } else {
                dp.classList.remove("is-valid");
                dp.classList.add("is-invalid");
                rdp.style.display = '';
                fields.Edpi = false;
            }
            break;

        case "nit": //sección para validar el codigo tributario
            const n = document.getElementById('inputNit');
            const rn = document.getElementById('resultNit');
            if (regularExpression.rEnit.test(e.target.value)) {
                n.classList.remove("is-invalid");
                n.classList.add("is-valid");
                rn.style.display = 'none';
                fields.Enit = true;
            } else {
                n.classList.remove("is-valid");
                n.classList.add("is-invalid");
                rn.style.display = '';
                fields.Enit = false;
            }
            break;
        case "postal": //sección para validar el código postal
            const p = document.getElementById('inputPostal');
            const rp = document.getElementById('resultPostal');
            if (regularExpression.rEpostal.test(e.target.value)) {
                p.classList.remove("is-invalid");
                p.classList.add("is-valid");
                rp.style.display = 'none';
                fields.Epostal = true;

            } else {
                p.classList.remove("is-valid");
                p.classList.add("is-invalid");
                rp.style.display = '';
                fields.Epostal = false;
            }
            break;
        case "phone":
            const ph = document.getElementById('inputPhone');
            const rph = document.getElementById('resultPhone');
            if (regularExpression.rEphone.test(e.target.value) || regularExpression.rEphone2.test(e.target.value)) {
                ph.classList.remove("is-invalid");
                ph.classList.add("is-valid");
                rph.style.display = 'none';
                fields.Ephone = true;


            } else {
                ph.classList.remove("is-valid");
                ph.classList.add("is-invalid");
                rph.style.display = '';
                fields.Ephone = false;
            }
            break;
        case "datei": //sección para validar la fecha inicial
            var dateivalue = e.target.value;
            var estadocheck = document.getElementById("hdate");
            if (estadocheck.checked == true) {
                evaluationDateICheck(dateivalue);

            } else {

                evaluationDateINocheck(dateivalue);
            }
            break;
        case "datef": //sección para validar la fecha final
            var datefvalue = e.target.value;
            var estadocheck = document.getElementById("hdate");
            if (estadocheck.checked == true) {
                evaluationDateFCheck(datefvalue);

            } else {

                evaluationDateFNocheck(datefvalue);
            }
            break;
    }

};

/**
 * @function newRegistrys:<object data="valores de los inputs"></object>
 * @inner tr table
 * 
 */
const registryTable = document.querySelector('#registry-list'); // obtiene el id del componente html que mostrará los datos.
function addRegistry(newRegistry) { //funcion para agregar nuevos datos
    //creacion de plantilla que muestra los datos en forma de tabla
    const newProductTemplate = ` 
            <tr class="table-secondary">
                <td><font size=2>${newRegistry.name}</font></td>
                <td><font size=2>${newRegistry.address}</font></td>
                <td><font size=2>${newRegistry.mail}</font></td>
                <td><font size=2>${newRegistry.password}</font></td>
                <td><font size=2>${newRegistry.sex}</font></td>
                <td><font size=2>${newRegistry.dpi}</font></td>
                <td><font size=2>${newRegistry.nit}</font></td>
                <td><font size=2>${newRegistry.codePostal}</font></td>
                <td><font size=2>${newRegistry.phone}</font></td>
                <td><font size=2>${newRegistry.datei}</font></td>
                <td><font size=2>${newRegistry.datef}</font></td>
                <td>
                <button class="btn btn-danger btn-sm">
                        DELETE
                </button>
                </td>
            </tr>       
        `;
    registryTable.innerHTML += newProductTemplate; //crea y agrega la nueva plantilla
    const btns = document.querySelectorAll('.btn.btn-danger'); //obtiene el id del boton eliminar
    btns.forEach(btn => { //recorre todos los botenes hasta encontrar el seleccionado
        btn.addEventListener('click', e => {
            e.target.parentElement.parentElement.remove(); //elimna el dato seleccionado
        });
    })
}

/**
 * @function listener
 * @param {evento:keyup,blur};
 * @returns {function formValidation(evento) {  
 }}
 */
inputs.forEach((input) => {
    input.addEventListener('keyup', formValidation);
    input.addEventListener('blur', formValidation);
});

/**
 * 
 * @param {idclass} idmessage 
 */
function messageSucces(idmessage) {
    document.getElementById(idmessage).style.display = ''; //muestra el mensaje de creacion de registro existoso
    setTimeout(() => {
        document.getElementById(idmessage).style.display = 'none'; // despues de 3000 mlsegundos hace desaparecer 
    }, 3000);

};

/**
 * 
 * @param {idclass} idmessaged muestra el mensaje de error por invalidacion de datos
 */

function messageDanger(idmessaged) {
    document.getElementById(idmessaged).style.display = '';
    setTimeout(() => {
        document.getElementById(idmessaged).style.display = 'none';

    }, 3000);
};
/**
 * 
 * @param {'#formData input'} idinput 
 * @param {'is-valid'} idclass 
 */
function removeValid(idinput, idclass) {

    document.querySelectorAll(idinput).forEach((input) => {
        input.classList.remove(idclass);
    });

}


/**
 * @function listener,submit
 * @param {event}
 * @returns {object:newRegistry}
 * 
 */
document.getElementById('formData')
    .addEventListener('submit', function(e) {
        e.preventDefault();
        console.log(fields);
        if (fields.Ename && fields.Eaddress && fields.Email && fields.Epassword && fields.Esex && fields.Edpi && fields.Enit && fields.Epostal && fields.Ephone && fields.Edatei && fields.Edatef) {

            //-------------obteniendo ids de todoos lo inputs del formulario
            const dna = document.querySelector('#inputName').value,
                dd = document.querySelector('#inputDirection').value,
                dm = document.querySelector('#inputMail').value,
                dpas = document.querySelector('#inputPassword').value,
                ds = document.querySelector('#inputSex').value,
                ddp = document.querySelector('#inputDpi').value,
                dn = document.querySelector('#inputNit').value,
                dp = document.querySelector('#inputPostal').value,
                dph = document.querySelector('#inputPhone').value,
                ddi = document.querySelector('#inputDateI').value,
                ddf = document.querySelector('#inputDateF').value;
            //---------------------------------------------

            const newRegistry = { //object: de nuevo registro con todos los valores de los inputs del formulario
                name: dna,
                address: dd,
                mail: dm,
                password: dpas,
                sex: ds,
                dpi: ddp,
                nit: dn,
                codePostal: dp,
                phone: dph,
                datei: ddi,
                datef: ddf
            }
            addRegistry(newRegistry); //llama a la funcion agregar registro y como parametro el object:newregistry
            messageSucces('alertsuccess'); //muestra mensaje de registro exitoso
            removeValid('#formData input', 'is-valid'); // elimina la clase '#formData input''is-valid'
            hideOrShowDate();
            document.querySelector('#resultday').style.display = 'none';
            fieldsdefault();
            formulario.reset(); //elimina todos los datos del formulario de los inputs

        } else {
            messageDanger('alertdanger'); //muestra mensaje de error
        }
    });