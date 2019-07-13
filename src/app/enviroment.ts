/*export const FIREBASE_CONFIG = {   
        apiKey: "AIzaSyD-xEm1QiOBZTN8bnV0ACCID9TzGYVnreE",
        authDomain: "consorcioapp-209d4.firebaseapp.com",
        databaseURL: "https://consorcioapp-209d4.firebaseio.com",
        projectId: "consorcioapp-209d4",
        storageBucket: "consorcioapp-209d4.appspot.com",
        messagingSenderId: "884050654811"    
};
*/

export const FIREBASE_CONFIG = {   
    apiKey: "AIzaSyBYo9eDR9X96Zqxz_-BSPJw154QCYruuQU",
    authDomain: "ppsappconsorcio.firebaseapp.com",
    databaseURL: "https://ppsappconsorcio.firebaseio.com",
    projectId: "ppsappconsorcio",
    storageBucket: "ppsappconsorcio.appspot.com",
    messagingSenderId: "217953168273",
};


export const ListaUsuarios = snapshot => {
    let ArrayUsuarios = [];
   // console.log("entro en la lista de usuarios");
    snapshot.forEach(element => {
        //console.log(element.val());
        let item = element.val();
        item.key = element.key;
        ArrayUsuarios.push(item);
    });
    //console.log(ArrayUsuarios);
    return ArrayUsuarios;
}

export const Imagenes = snapshot => {
    let arrayImagenes = [];
    //console.log("entro en la lista de imagenes");
    snapshot.forEach(element => {
        //console.log(element.val());
        let item = element.val();
        item.key = element.key;
        arrayImagenes.push(item);
    });
    //console.log(arrayImagenes);
    return arrayImagenes;
}





export const UsuariosTest = () => {
    let ArrayUsuariosTest = [
        {"id":1,"correo":"admin@gmail.com","clave":1111,"perfil":"admin","sexo":"femenino"},
        {"id":2,"correo":"invitado@gmail.com","clave":2222,"perfil":"invitado","sexo":"femenino"},
        {"id":3,"correo":"usuario@gmail.com","clave":3333,"perfil":"usuario","sexo":"masculino"},
        {"id":4,"correo":"anonimo@gmail.com","clave":4444,"perfil":"usuario","sexo":"masculino"},
        {"id":5,"correo":"tester@gmail.com","clave":5555,"perfil":"tester","sexo":"femenino"}
    ];


    return ArrayUsuariosTest;
}