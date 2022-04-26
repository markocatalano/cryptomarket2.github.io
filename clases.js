//Objeto datos del Usuario
class Usuario{
    constructor(nombre,password,email,dni){
        this.nombre=nombre;
        this.password=password;
        this.email=email;
        this.dni=dni;
    }
    saludar(){
        alert("Bienvenido "+(this.nombre)+" a CryptoMarket")
    }
}


//Arrray con crytpos disponibles para comprar
const cryptos=
[{codigo:1, nombre:"BITCOIN", par:"BTCUSDT",cotizacion:2124540,interes: 0.05, img:"img/btc.png" },
{codigo:2,nombre:"ETHEREUM", par:"ETHUSDT",cotizacion:1123540,interes: 0.08,img:"img/eth.png"},
{codigo:3,nombre:"USDT", par:"USDT",cotizacion:210,interes: 0.18, img:"img/usdt.png"},
{codigo:4,nombre:"DAI", par:"Dai",cotizacion:210,interes: 0.15, img:"img/DAI.png"}]

