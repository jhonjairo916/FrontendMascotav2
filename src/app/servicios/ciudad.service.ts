import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CiudadModelo } from '../modelos/Ciudad.modelo';
import {DatosGenerales} from '../config/datos.generales'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  url: String= DatosGenerales.urlBackend;
  token?: String;

  constructor( 
    private http: HttpClient,
    private servicioSeguridad: SeguridadService) 
    {
      this.token = this.servicioSeguridad.ObtenerToken()
    }

  LitarCiudad():Observable<CiudadModelo[]>{
    return this.http.get<CiudadModelo[]>(`${this.url}/ciudades`,{
      headers: new HttpHeaders({
        'Authorization':`Bearer ${this.token}`
      })
    })
  }
  GuardarCiudad(ciudad: CiudadModelo):Observable<CiudadModelo>{
    return this.http.post<CiudadModelo>(`${this.url}/ciudades`,{
      nombre: ciudad.nombre,
      departamentoId: ciudad.departamentoId
    },
    {
      headers: new HttpHeaders({
        'Authorization':`Bearer ${this.token}`
      })
    })
    
  }
  ActualizarCiudad(ciudad: CiudadModelo):Observable<CiudadModelo>{
    //alert("Esta es la ciudad "+ciudad.id)
    return this.http.put<CiudadModelo>(`${this.url}/ciudades/${ciudad.id}`,ciudad,{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }
  BuscarCiudad(id: number):Observable<CiudadModelo>{
    return this.http.get<CiudadModelo>(`${this.url}/ciudades/${id}`,{
      headers: new HttpHeaders({
        'Authorization':`Bearer ${this.token}`
      })
    })
  }
  EliminarCiudad(id:number):Observable<boolean>{
    return this.http.delete<boolean>(`${this.url}/ciudades/${id}`,{
      headers: new HttpHeaders({
        'Authorization':`Bearer ${this.token}`
      })
    })
  }
  //TODO
  //Replace the id of the departamento with the name
  ObtenerNombreDepartamento(id:number):Observable<any>{
    return this.http.get<any>(`${this.url}/ciudads/${id}/departamento`,{
      headers: new HttpHeaders({
        'Authorization':`Bearer ${this.token}`
      })
    })
  }
}
