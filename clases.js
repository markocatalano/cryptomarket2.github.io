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

