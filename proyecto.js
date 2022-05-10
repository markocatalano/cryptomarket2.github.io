
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
        tabla.style.display="none";
        div1.style.display="none";
        div2.style.display="block";
    
    })
}



//Visualizacion de Cryptos:

const verCrytpos= async()=>{
    const respuesta= 
    await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2Cethereum%2Cdai%2Ctether%2Cusd-coin%2Cterra-luna%2Csolana%2Ccardano%2Caave&order=market_cap_desc&per_page=100&page=1&sparkline=false'`)

    const data= await respuesta.json();

    console.log(respuesta)
    console.log(data)

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
            <td class="vp">${variacionPrecio.toFixed(2)}%</td>
            <td>${marketCap}</td>
            <td><a id=${element.market_cap_rank} class="btn btn-success">Comprar</a></td>
            
        </tr>`
        
                /* //Formato para la variacion diaria
                const vp=document.getElementsByClassName("vp");

                    if (variacionPrecio>0){
                        vp.classList.add("success")
                        console.log("mayor")
                    }
                    else{
                        vp.classList.add("danger")
                        
                    }
                */
    });

//Evento al apretar boton Comprar

botonosCrypto();


function botonosCrypto(){
    data.forEach(i=>{
        let botonComprar=document.getElementById(`${i.market_cap_rank}`)
        botonComprar.addEventListener("click", (e)=>{  
            console.log(botonComprar)
            if (arrayUsuarios.length==0){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Primero debes estar registrado para poder compara ',
                  })
            }
            else{
                e.stopPropagation();
                ventanaCompra(i.market_cap_rank);
                if(porfolio.length>1){
                    porfolio.shift();
                }
            } 
           
    })
    
})

} 


//Funcion para encontrar el objeto que el usuario eligio: 

function ventanaCompra(market_cap_rank){
    
    let mostrarCompra=data.find(elemento=>elemento.market_cap_rank==market_cap_rank)
    console.log(mostrarCompra)
    porfolio.push(mostrarCompra)
    console.log(porfolio)
    
    formularioCompras(mostrarCompra);


}


//Funcion para mostrar formulario para ingresas monto:

function formularioCompras(mostrarCompra){
    
    formularioCompra.id=`formCompra${mostrarCompra.id}`

    formularioCompra.innerHTML = `<hr>
    <h3>${mostrarCompra.name}</h3>
    <label>ARS a ${mostrarCompra.symbol.toUpperCase()}</label>
    <input type="number" id="pesos${mostrarCompra.id}">
    <input type="submit" id="aceptarPesos${mostrarCompra.id}" value="Aceptar">
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
        let cal5=document.getElementById(`pesos${porfolio[0].id}`).value
        let cal6=(cal5/porfolio[0].current_price)
        console.log(cal6)
        porfolio[0].cantidad=cal6.toFixed(3)
        Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: `Felicitaciones\nUsted compro ${cal6.toFixed(3)} ${porfolio[0].name}`,
            showConfirmButton: false,
            timer: 1200
          })
             
        registroCompras();  
            
    })
         
    
}



 //Lista para ver las Compras Realizadas
 function registroCompras(){
    
    let date = new Date();

    div2.style.display="none";

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
        template.querySelector("span").textContent = `El ${date.toISOString().split('T')[0]} compró ${item.cantidad} ${item.name}`;
        const clone = template.cloneNode(true);
        fragment.appendChild(clone);
    });
    }
    lista.appendChild(fragment); 
    div2.appendChild(lista) 
    

}
 


} //para cerrar verCryptos()


verCrytpos();




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


