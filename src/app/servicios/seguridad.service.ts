import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UsuarioModelo } from '../modelos/Usuario.modelo';
import {DatosGenerales} from '../config/datos.generales';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {
  url: String = DatosGenerales.urlBackend;
  
  //Check the behavior of a variable
  datosUsuarioSession = new BehaviorSubject<UsuarioModelo>(new UsuarioModelo());
  constructor(
    private http: HttpClient,//It allows invoke the backend
    ) { 
      this.VerificarDatosSession();
    }
  VerificarDatosSession(){
    let datos = this.ObtenerDatosLocalStorage();
    if(datos){
      let objetoDatos: UsuarioModelo = JSON.parse(datos);//Its convert the string in a object again
      objetoDatos.isLoggedIn= true;
      this.RefrescarDatosSession(objetoDatos);
    }
  }
  ObtenerDatosLocalStorage(){
    let datos = localStorage.getItem("sessionData");
    return datos;
  }
  ObtenerToken(){
    let datosLocales = this.ObtenerDatosLocalStorage();
    if(datosLocales){
      let objeto:UsuarioModelo= JSON.parse(datosLocales);
      return objeto.token;
    }
    return "";
  
  }

  RefrescarDatosSession(usuario: UsuarioModelo){
    this.datosUsuarioSession.next(usuario);
  }
  ObtenerDatosSession(){
    return this.datosUsuarioSession.asObservable();
  }
  IdentificarUsuario(usuario: UsuarioModelo):Observable<any>{
    return this.http.post<any>(`${this.url}/identificar`,{
      name_user: usuario.username,
      pass_user: usuario.clave
    },{
      headers: new HttpHeaders({

      })
    })
  }
  GuardarDatosEnLocal(usuario: UsuarioModelo): Boolean{
    let datosLocales = localStorage.getItem("sessionData");
    if (datosLocales){
      return false;
    }
    else{
      //If the session hasn´t been started, assign the data to the variable datos
      let datos = {
        id: usuario.user?.id,
        username: usuario.user?.username,
        token: usuario.token
      }
      let datosString = JSON.stringify(datos);//It convert JSON data to a string
      localStorage.setItem("sessionData",datosString);//It assign the string "datosString" to the sessionData
      usuario.isLoggedIn = true;//Set the variable isLoggedIn to true to indicate that the session was started
      this.RefrescarDatosSession(usuario);
      return true;
    }
    
  }

  CerrarSession(){
    localStorage.removeItem("sessionData");
    //The Object UsuarioModelo is reseted 
    this.RefrescarDatosSession(new UsuarioModelo());
  }
  
}
