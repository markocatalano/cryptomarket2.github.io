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
[{codigo:1, nombre:"BITCOIN", par:"BTC/USD",cotizacion:2124540,interes: 5, img:"img2/btc2.png" },
{codigo:2,nombre:"ETHEREUM", par:"ETH/USD",cotizacion:1123540,interes: 8,img:"img2/eth2.png"},
{codigo:3,nombre:"LUNA", par:"LUNA/USD",cotizacion:9118,interes: 10,img:"img2/luna2.png"},
{codigo:4,nombre:"USDT", par:"USDT/USD",cotizacion:210,interes: 18, img:"img2/usdt2.png"},
{codigo:5,nombre:"DAI", par:"DAI/USD",cotizacion:210,interes: 15, img:"img2/dai2.png"},
{codigo:6,nombre:"UST", par:"UST/USD",cotizacion:210,interes: 19, img:"img2/ust2.png"}]

