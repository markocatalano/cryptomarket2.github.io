
//Llamamos a los DOM
const btnRegistro=document.getElementById("btnRegistro");

const formRegistro=document.getElementById("formRegistro");

const modal=document.getElementById("exampleModal"); 

const main=document.getElementById("main");

const div1=document.getElementById("div1");

const div2=document.getElementById("div2");

const imput=document.getElementById("aceptarPesos");

const formularioCompra = document.createElement("form")

//Lista para guardar datos del usuario
const arrayUsuarios=[];  

//Array para guardar cryptos elegidas:
const porfolio=[];
 
//Evento del submit del form:
formRegistro.addEventListener("submit", nuevoUsuario);


//Funcion para cargar valores de los imput al objeto usuario:
function nuevoUsuario (e) {

    e.preventDefault();
    
    const Nombre=document.getElementById("nombreUsuario").value;
    const password=document.getElementById("password").value;
    const email=document.getElementById("email").value;
    const dniUsuario=document.getElementById("dni").value;

    // Verificacion si no ingreso un nombre de usuario
    while(Nombre==""){
        alert("Ingrese un nombre de usuario")
        Nombre=document.getElementById("nombreUsuario").value
    }

    //Verificacion de que el password sea de por lo menos 8 caracteres
    while(password.length<8){
        alert("Ingrese un password de por lo menos 8 caracteres")
        password=document.getElementById("password").value;
    }

    //Verificar si mail contiene arroba y al menos un punto:

    let contador=0;
    for(let i of email){
        if (i=="@" || i=="."){
        contador++;
    }}

    if(contador<2){
        alert("Ingreso un email incorrecto, asegurese que el email contenga un arroba y por lo menos un punto");
        email=document.getElementById("email").value
    }

    // Verificar si dni es numerico y tiene longitud de por lo menos 8 numeros:

    while(dniUsuario.length<8 || isNaN(dniUsuario)){
        alert("Ingrese un dni que contenga solo numeros y por lo menos 8 caracteres")
        dniUsuario=document.getElementById("dni").value;
    }
    
    // Verificacion si dni ya esta registrado en la base de datos

    const arrayPersonas=JSON.parse(localStorage.getItem("arrayPersonas"));
    console.log(arrayPersonas)


    const resultadoBuscar=arrayPersonas.find(i=>i.dni==dniUsuario)
    console.log(resultadoBuscar)

    if (resultadoBuscar!=undefined){
        alert("DNI ya registrado en nuestra Base de Datos")
        
    }
    else{
        const usuarioRegistrado=new Usuario(Nombre,password,email,dniUsuario)
    
        arrayUsuarios.push(usuarioRegistrado)

        console.log(arrayUsuarios)

        localStorage.setItem("arrayPersonas", JSON.stringify(arrayUsuarios));

        usuarioRegistrado.saludar();
    }
    

  
    
}


//Visualizacion de Cryptos:

verCrytpos();

function verCrytpos(){
    
    cryptos.forEach(element => {
        main.innerHTML+=
            `<div class="card mt-5 ms-5" style="width: 12rem;">
        <img src=${element.img} class="card-img-top" alt="...">
        <a id=${element.codigo} class="btn btn-warning">Comprar</a>
        <div class="card-body">
          <h5 class="card-title text-center">${element.nombre}</h5>
          <p class="card-text text-center">Cotizacion: $${element.cotizacion} </p>
        </div>`

        
  
    });
}
 
//Evento al apretar boton Comprar

 botonosCrypto();

function botonosCrypto(){
    cryptos.forEach(i=>{
        let botonComprar=document.getElementById(`${i.codigo}`)
        botonComprar.addEventListener("click", (e)=>{    
            e.stopPropagation();
            ventanaCompra(i.codigo);
            if(porfolio.length>1){
                porfolio.shift();
            }
           
    })
    
})

} 
 
//Funcion para encontrar el objeto que el usuario eligio: 

function ventanaCompra(codigo){
    let mostrarCompra=cryptos.find(elemento=>elemento.codigo==codigo)
    porfolio.push(mostrarCompra)
    console.log(porfolio)
    
    formularioCompras(mostrarCompra);

   
    

}

//Funcion para mostrar formulario para ingresas monto:

function formularioCompras(mostrarCompra){
    
    formularioCompra.id=`formCompra${mostrarCompra.codigo}`

    formularioCompra.innerHTML = `<hr>
    <h3>${mostrarCompra.nombre}</h3>
    <label>Pesos Arg($) a ${mostrarCompra.par}</label>
    <input type="number" id="pesos${mostrarCompra.codigo}">
    <input type="submit" id="aceptarPesos" value="Aceptar">
    <hr>
    `
    div1.appendChild(formularioCompra)
    

    calculos(formularioCompra)
    
}

 
//Ver indices en array Porfolio:
function verPorfilio(cantidad) {

    porfolio.forEach((i) => {
        if (i.nombre == "BITCOIN") {
            i.cantidad = cantidad
        }
        else if (i.nombre == "ETHEREUM") {
            i.cantidad = cantidad
        }
        else if (i.nombre == "UDST") {
            i.cantidad = cantidad
        }
        else {
            i.cantidad = cantidad
        }
    })
}



//Obtencion del monto de dinero ingresado por el usuario: 
function calculos(item){
    
    item.addEventListener("submit", (e1)=>{
        e1.preventDefault(); 
        e1.stopPropagation();  
        let cal5=document.getElementById(`pesos${porfolio[0].codigo}`).value
        let cal6=(cal5/porfolio[0].cotizacion)
        console.log(cal6)
        porfolio[0].cantidad=cal5
        alert(`Usted compro ${cal6.toFixed(5)} ${porfolio[0].nombre} `)
            
        registroCompras();    
            
    })
         
      
    
}


 //Lista para ver las Compras Realizadas
function registroCompras(){
    let date = new Date();

    const h3=document.querySelector(".tituloTenencia")
    h3.innerHTML="Transacciones Realizadas"
 
    const lista = document.getElementById("lista-dinamica");
 
    const fragment = document.createDocumentFragment();
    const template = document.querySelector("#template-li").content;
 
     porfolio.forEach((item) => {
        template.querySelector("span").textContent = `El ${date.toISOString().split('T')[0]} compró ${item.cantidad} ${item.nombre}`;
        const clone = template.cloneNode(true);
        fragment.appendChild(clone);
    });
 
    lista.appendChild(fragment); 
    div2.appendChild(lista) 

}
 






//Futuras funciones a agregar:

/* function mostrarFormulario1(){
    document.getElementById("formCompra2").style.display="none"
    document.getElementById("formCompra3").style.display="none"
    document.getElementById("formCompra4").style.display="none"
}

function mostrarFormulario2(){
    document.getElementById("formCompra1").style.display="none"
    document.getElementById("formCompra3").style.display="none"
    document.getElementById("formCompra4").style.display="none"
}
  */
 

/* //Funcion para verificar si DNI ingresado ya esta registrado:
 function dniVerification(){
    const arrayPersonas=JSON.parse(localStorage.getItem("arrayPersonas"));
    console.log(arrayPersonas)
    
    const resultadoBuscar=arrayPersonas.find(el=>el.dni==dniUsuario)
    console.log(resultadoBuscar)

    if (resultadoBuscar!=undefined){
        alert("DNI ya registrado")
    }
 
    
}  */