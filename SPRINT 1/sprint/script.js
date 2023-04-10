/* Escribir una lista de usuarios con los siguientes datos: nombre, número 
de documento, contraseña y tipo de usuario. El tipo de usuario será: 1: 
administrador, 2: cliente. Guardarla en un array de objetos. */

const userList = [
    {
        name: "Diego Samudio",
        ID: 1000185568,
        password: "12345",
        userType: 1,
    },

    {
        name: "Bartolomeo",
        ID: 123432524,
        password: "12345",
        userType: 2,
    }]

/*Realizar un programa que al inicio solicite ingresar documento y 
contraseña, si el usuario no existe debe indicar que no existe y volver a 
preguntar usuario y contraseña, si el usuario es administrador, debe 
permitir cargar el cajero de la siguiente manera:*/

const validacion = () =>{
    
    let validation = true;
    let user = {};

    while (validation){
        const identification = parseInt(prompt("Por favor, digite su ID:"));
        const passwordUser = prompt("Por favor, digite su contraseña:");

        userList.forEach(element => {
            if (element.ID == identification && element.password == passwordUser){
                user = element;
                validation = false;
            }
        });
        if (validation == true){
            alert("El usuario no existe o la contraseña es incorrecta. A continuacion vuelva a intentar");
        };
    };
    return user;
}

 /* Solicitar la cantidad de billetes de 5, 10, 20, 50 y 100 mil pesos COP.
,,Almacenar esta información en un array de objetos.
,, Una vez tenga la información, debe mostrar en consola la suma por cada 
denominación y el total general.*/

let platadentrodelcajero = [
    {
    cantidad: 0,
    denominacion: 100000,
    },

    {
    cantidad: 0,
    denominacion: 50000,
    },

    {
    cantidad: 0,
    denominacion: 20000,
    },

    {
    cantidad: 0,
    denominacion: 10000,
    },

    {
    cantidad: 0,
    denominacion: 5000,
    }
];

const cajero = (platadentrodelcajero, usuario) => {
    
    if(usuario.userType == 1){

        let sumtotal = 0;
        platadentrodelcajero.forEach(element => {

            element.cantidad += parseInt(prompt(" Usted es un administrador, ingrese la cantidad de billetes de " + element.denominacion + ": "));
            const totalporden = element.cantidad * element.denominacion;
            console.log("La suma de billetes de " + element.denominacion + " es " + totalporden + ". Y la cantidad de billetes: " + element.cantidad + ".");
            sumtotal += totalporden;
        });
        console.log("La suma total de billetes en el cajero es " + sumtotal + ".");
    }

    else if(usuario.userType == 2){

        let sumtotal = 0;
        platadentrodelcajero.forEach(element => {

            const totalporden = element.cantidad * element.denominacion;
            sumtotal += totalporden;
        });

        if(sumtotal == 0){
            console.log("Cajero en mantenimiento, vuelva pronto.");

        } else if(sumtotal > 0){
            let cantidadpararetirar = parseInt(prompt("Ingrese la cantidad a retirar: "));
            console.log("La cantidad que el cliente quiere retirar es " + cantidadpararetirar + ".");
            
            if (cantidadpararetirar <= sumtotal){

                let cantidadEntregar = 0;
                platadentrodelcajero.forEach(element => {
                    const billetes = Math.floor(cantidadpararetirar/element.denominacion);
                    
                    if(billetes <= element.cantidad){
                        
                        if(cantidadpararetirar >= element.denominacion * billetes){
                            cantidadpararetirar -= element.denominacion * billetes;
                            element.cantidad -= billetes;
                            cantidadEntregar += element.denominacion * billetes;
                            console.log("Se entregaron " + billetes + " de " + element.denominacion + ".");
                        }
                   
                    } else if(billetes > element.cantidad){
                        
                        if(cantidadpararetirar >= element.denominacion * element.cantidad){
                                console.log("Se entregaron " + element.cantidad + " de " + element.denominacion + ".");
                                cantidadEntregar += element.denominacion * element.cantidad;
                                cantidadpararetirar -= element.denominacion * element.cantidad;
                                element.cantidad -= element.cantidad;
                        }
                    }
                })
                
                console.log("La cantidad que el cajero pudo entregar fue " + cantidadEntregar + " y le falto por entregar " + cantidadpararetirar + ".");

                let dineroDisponible = 0;
                platadentrodelcajero.forEach(element => {
                  
                    const totalporden = element.cantidad * element.denominacion;
                    console.log("La suma de billetes de " + element.denominacion + " restante en el cajero es " + totalporden + ". La cantidad restante de billetes: " + element.cantidad + ".");
                    dineroDisponible += totalporden;
                });

            } else if (cantidadpararetirar > sumtotal){
                console.log("El cajero cuenta fondos insuficientes para realizar el retiro.");
            }
        }
    }

    const newUser = prompt("¿Quiere intentar una vez mas? (si o no): ");
    return newUser
}

/*Bucle de repetición.*/

        let newUser = "si";
        while(newUser == "si"){
            const usuario = validacion();
            newUser = cajero(platadentrodelcajero, usuario);
        }
        while(newUser == "no"){
            window.alert("Retire la tarjeta y vayase")
        }
            
