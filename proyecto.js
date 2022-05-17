
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

const btnMonedas=document.getElementById("misMonedas");

const tarjetas=document.querySelector(".card mt-5 ms-5");

const filasTabla=document.getElementById("bodyTabla");

const tabla=document.getElementById("tabla");

const misCompras=document.getElementById("misCompras");

const span = document.getElementsByClassName("close")[0];

const span2 = document.getElementsByClassName("close")[1];

const contenidoModal=document.getElementById("contenidoModal");

const bodyTablaMonedas=document.getElementById("bodyTablaMonedas");

const div3=document.getElementById("div3");

let cal5=0;


//Bloqueo de display para mostrar nombre de usuario y menu:
usuarioIngreso.style.display="none";
menuUsuario.style.display="none";
btnSalir.style.display="none";
div3.style.display="none";


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

    while(dniUsuario.length!=8 || isNaN(dniUsuario)){
        alert("Ingrese un dni que contenga solo numeros y 8 caracteres")
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
        
        window.onclick = function(event) {
            if (event.target == modal) {
              modal.style.display = "none";
            }
          }    


        verMisCompras();
        verMisMonedas();  
        

    }
    
    
}


//Mis compras Boton: 

function verMisCompras(){
    misCompras.addEventListener("click",()=>{  
        
        if (porfolio.length==0 || cal5==0){
            Swal.fire({
                icon: 'warning',
                title: "No posee transacciones realizadas al momento",
                
              })
            
        }
        else {
            tabla.style.display = "none";
            div1.style.display = "none";
            div2.style.display = "block";
        }
    
    })
}

//Mis Monedas Boton: 



function verMisMonedas(){
    btnMonedas.addEventListener("click",()=>{ 
        console.log("hola") 
        
        if (porfolio.length==0 || cal5==0){
            Swal.fire({
                icon: 'warning',
                title: "No posee Monedas",

              })
            
        }
        else {
            div3.style.display = "block"
            window.onclick = function (event) {
                if (event.target == div3) {
                    div3.style.display = "none";
                }
            }
           
        }
    
 })
}

//Funcion para cerrar Modal Monedas:

 span2.onclick = function () {
    div3.style.display = "none";
}



//Visualizacion de Cryptos:

const verCrytpos= async()=>{
    const respuesta= 
    await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2Cethereum%2Cdai%2Ctether%2Cusd-coin%2Cterra-luna%2Csolana%2Ccardano%2Caave&order=market_cap_desc&per_page=100&page=1&sparkline=false'`)

    const data= await respuesta.json();
    return data
    
}


const data= verCrytpos().then(data => {

        data.forEach(element => {

            //Mostramos los valores formato moneda
            const marketCap=new Intl.NumberFormat('en-US', {style: 'currency',currency: 'USD'}).format(element.market_cap);
            const precioArs=(element.current_price)*200
            const precio=new Intl.NumberFormat('en-US', {style: 'currency',currency: 'USD'}).format(precioArs);
            

            //const Varacion de Precio
            const variacionPrecio=element.price_change_percentage_24h

            //Creamos las filas de la tabla
            filasTabla.innerHTML+=
        `<tr>
            <th scope="row" class="bl-3">${data.indexOf(element)}</th>
            <td><img src=${element.image} class="img-fluid" alt="Responsive image" height="36" width="36"> ${element.name}</td>
            <td>${element.symbol.toUpperCase()} /USD</td>
            <td>${precio}</td>
            <td id=crypto${data.indexOf(element)}>${variacionPrecio.toFixed(2)}%</td>
            <td>${marketCap}</td>
            <td><a id=${element.market_cap_rank} class="btn btn-success">Comprar</a></td>
            
        </tr>`
                 
                
    });
        for (i = 0; i < 9; i++) {
            const id = document.getElementById(`crypto${i}`).textContent;
            const ide=document.getElementById(`crypto${i}`);
            console.log(id)

            if (parseFloat(id)>0.00){
                ide.classList.add("text-success")
            }
            else{
                ide.classList.add("text-danger")
            }
            

        }

    botonosCrypto(data);
})


//Evento al apretar boton Comprar

function botonosCrypto(data){
    data.forEach(i=>{
        let botonComprar=document.getElementById(`${i.market_cap_rank}`)
        botonComprar.addEventListener("click", (e)=>{  
            console.log(botonComprar)
            if (arrayUsuarios.length==0){
                Swal.fire({
                    icon: 'error',
                    title: 'Primero debes estar registrado para poder comprar',
                  })
            }
            else{
                e.stopPropagation();
                ventanaCompra(i.market_cap_rank, data);
                div1.style.display = "block"
                window.onclick = function(event) {
                    if (event.target == div1) {
                      div1.style.display = "none";
                    }
                  } 
                if(porfolio.length>1){
                    porfolio.shift();
                }
            } 
           
    })
    
})

} 


//Funcion para encontrar el objeto que el usuario eligio: 

function ventanaCompra(market_cap_rank ,data){
    
    let mostrarCompra=data.find(elemento=>elemento.market_cap_rank==market_cap_rank)
    console.log(mostrarCompra)
    porfolio.push(mostrarCompra)
    console.log(porfolio)
    
    formularioCompras(mostrarCompra);

}


//Funcion para mostrar formulario para ingresas monto:

function formularioCompras(mostrarCompra){
    
    formularioCompra.id=`formCompra${mostrarCompra.id}`

    formularioCompra.innerHTML = `
    
    <h3><img src=${mostrarCompra.image} class="img-fluid" alt="Responsive image" height="36" width="36">${mostrarCompra.name}</h3>
    <input type="number" class="text-center"  placeholder="$ARS a ${mostrarCompra.symbol.toUpperCase()}" id="pesos${mostrarCompra.id}" >
    <input type="submit" id="aceptarPesos${mostrarCompra.id}" class="aceptar" value="Aceptar">
    `
    contenidoModal.appendChild(formularioCompra);

}


//Funciones para cerrar Modal Compra

span.onclick = function() {
    div1.style.display = "none";

  }


//Obtencion del monto de dinero ingresado por el usuario: 
calculos(formularioCompra)



function calculos(item){
    
    item.addEventListener("submit", (e1)=>{
        e1.preventDefault(); 
        e1.stopPropagation();  
        cal5=document.getElementById(`pesos${porfolio[0].id}`).value
        console.log(cal5)
        if (cal5==0){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ingresa un valor',
              })
        }
        else {
            let cal6 = (cal5 / (porfolio[0].current_price * 200))
            console.log(cal6)
            porfolio[0].cantidad = cal6.toFixed(5)
            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: `Felicitaciones\nUsted compro ${cal6.toFixed(5)} ${porfolio[0].name}`,
                showConfirmButton: false,
                timer: 1200
            })
            
            div1.style.display = "none";
            
            
        }     
          
        registroCompras();
        monedasAdquiridas();

    })
    
}
 

 //Lista para ver las Compras Realizadas:

 function registroCompras(){
    
    let date = new Date();

    div2.style.display="none";

    const h3=document.querySelector(".tituloTenencia")
    h3.innerHTML="Transacciones Realizadas"
 
    const lista = document.getElementById("lista-dinamica");
 
    const fragment = document.createDocumentFragment();
    const template = document.querySelector("#template-li").content;
    
     porfolio.forEach((item) => {
        template.querySelector("span").textContent = `El ${date.toISOString().split('T')[0]} compró ${item.cantidad} ${item.name}`;
        const clone = template.cloneNode(true);
        fragment.appendChild(clone);
    });
    
    lista.appendChild(fragment); 
    div2.appendChild(lista) 
    

}
 

//Funcion para ver las monedas en la lista desplegable del usuario:

function monedasAdquiridas(){
    porfolio.forEach(element=>{
        const cantidadARS= (200/element.cantidad).toFixed(2)
        bodyTablaMonedas.innerHTML+=
        `<tr>
            <td><img src=${element.image} class="img-fluid" alt="Responsive image" height="36" width="36"> ${element.name}</td>
            <td class="text-right">${element.cantidad} ${element.symbol.toUpperCase()}</td>
        </tr>`
            
    })
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
    tabla.style.display="block";
})
