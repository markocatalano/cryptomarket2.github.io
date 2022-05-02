
//Llamamos a los DOM
const btnRegistro=document.getElementById("btnRegistro");

const formRegistro=document.getElementById("formRegistro");

const modal=document.getElementById("exampleModal"); 

const main=document.getElementById("main");

const div1=document.getElementById("div1");

const div2=document.getElementById("div2");

const imput=document.getElementById("aceptarPesos");

const formularioCompra = document.createElement("form");

const usuarioIngreso=document.getElementById("ingreso");

const btnSalir=document.getElementById("btnSalir")

const menuUsuario=document.getElementById("menuUsuario");

const btnUsuario=document.getElementById("btnUsuario");

const btnTenencias=document.getElementById("tenencias");

const tarjetas=document.querySelector(".card mt-5 ms-5");

const filasTabla=document.getElementById("bodyTabla");

const tabla=document.getElementById("tabla");

const misCompras=document.getElementById("misCompras");

//Bloqueo de display para mostrar nombre de usuario y menu:
usuarioIngreso.style.display="none";
menuUsuario.style.display="none";
btnSalir.style.display="none";

//Lista para guardar datos del usuario:
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

    if (arrayUsuarios.length>=1){

        const arrayPersonas2=JSON.parse(localStorage.getItem("arrayPersonas"));
        console.log(arrayPersonas2)


        const resultadoBuscar=arrayPersonas2.find(i=>i.dni==dniUsuario)
        console.log(resultadoBuscar)

        if (resultadoBuscar!=undefined){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "DNI ya registrado en nuestra Base de Datos",
                
              })
            
        }
    }
    else{
        const usuarioRegistrado=new Usuario(Nombre,password,email,dniUsuario)
    
        arrayUsuarios.push(usuarioRegistrado)

        console.log(arrayUsuarios)

        localStorage.setItem("arrayPersonas", JSON.stringify(arrayUsuarios));

        Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: `Bienvenido ${Nombre}`,
            showConfirmButton: false,
            timer: 1200
          })

        btnRegistro.style.display="none";
        menuUsuario.style.display="block";
        btnSalir.style.display="block";
        btnUsuario.textContent=`${Nombre}`
        verMisCompras();
        

    }
    
    
}


//Mis compras Boton: 

function verMisCompras(){
    misCompras.addEventListener("click",()=>{  
        registroCompras();  
    
    })
}



//Visualizacion de Cryptos:

verCrytpos();


function verCrytpos(){
    
    cryptos.forEach(element => {
        filasTabla.innerHTML+=
        `<tr>
            <th scope="row" class="bl-3">${element.codigo}</th>
            <td><img src=${element.img} class="img-fluid" alt="Responsive image" height="36" width="36"> ${element.nombre}</td>
            <td>${element.par}</td>
            <td>$ ${element.cotizacion} ARS</td>
            <td>${element.interes}%</td>
            <td><a id=${element.codigo} class="btn btn-success">Comprar</a></td>
            
        </tr>` 
  
    });
}
 



//Evento al apretar boton Comprar

 botonosCrypto();

function botonosCrypto(){
    cryptos.forEach(i=>{
        let botonComprar=document.getElementById(`${i.codigo}`)
        botonComprar.addEventListener("click", (e)=>{  
            if (arrayUsuarios.length==0){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Primero debes estar registrado para poder compara ',
                  })
            }
            else{
                e.stopPropagation();
                ventanaCompra(i.codigo);
                if(porfolio.length>1){
                    porfolio.shift();
                }
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
    <label>ARS a ${mostrarCompra.par}</label>
    <input type="number" id="pesos${mostrarCompra.codigo}">
    <input type="submit" id="aceptarPesos${mostrarCompra.codigo}" value="Aceptar">
    <hr>
    `
    div1.appendChild(formularioCompra)
    

    
    
}



//Obtencion del monto de dinero ingresado por el usuario: 
calculos(formularioCompra)

function calculos(item){
    
    item.addEventListener("submit", (e1)=>{
        e1.preventDefault(); 
        e1.stopPropagation();  
        let cal5=document.getElementById(`pesos${porfolio[0].codigo}`).value
        let cal6=(cal5/porfolio[0].cotizacion)
        console.log(cal6)
        porfolio[0].cantidad=cal6.toFixed(3)
        Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: `Felicitaciones\nUsted compro ${cal6.toFixed(3)} ${porfolio[0].nombre}`,
            showConfirmButton: false,
            timer: 1200
          })
             
    
            
    })
         
    
}


 //Lista para ver las Compras Realizadas
function registroCompras(){
    
    let date = new Date();

    tabla.style.display="none";
    div1.style.display="none";

    const h3=document.querySelector(".tituloTenencia")
    h3.innerHTML="Transacciones Realizadas"
 
    const lista = document.getElementById("lista-dinamica");
 
    const fragment = document.createDocumentFragment();
    const template = document.querySelector("#template-li").content;
    
    if(porfolio.length==0){
        template.querySelector("span").textContent = `No posee transacciones hasta el momento`
        const clone = template.cloneNode(true);
        fragment.appendChild(clone);
    }
    else{

     porfolio.forEach((item) => {
        template.querySelector("span").textContent = `El ${date.toISOString().split('T')[0]} compró ${item.cantidad} ${item.nombre}`;
        const clone = template.cloneNode(true);
        fragment.appendChild(clone);
    });
    }
    lista.appendChild(fragment); 
    div2.appendChild(lista) 
    

}
 

//Btn para cerrar secion:

btnSalir.addEventListener("click", ()=>{
    usuarioIngreso.style.display="none"
    btnRegistro.style.display="block"
    menuUsuario.style.display="none"
    Swal.fire({
        icon: 'success',
        text: 'Ha finalizado su secion',
      })
    btnSalir.style.display="none";
    div2.style.display="none";
    div1.style.display="none";
})





