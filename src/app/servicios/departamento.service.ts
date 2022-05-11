import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosGenerales } from '../config/datos.generales';
import { DepartamentoModelo } from '../modelos/Departamento.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
  url: String = DatosGenerales.urlBackend;
  token?: String;
  constructor(
    private http: HttpClient,
    private servicioSeguridad : SeguridadService) 
    {
      this.token= this.servicioSeguridad.ObtenerToken();
      //console.log('Token'+this.token)
    }

  GuardarDepartamento(departamento: DepartamentoModelo):Observable<DepartamentoModelo>{
    return this.http.post<DepartamentoModelo>(`${this.url}/departamentos`,{
      nombre: departamento.nombre
    },
    {
      headers: new HttpHeaders({
        'Authorization':`Bearer ${this.token}`
      })
    })

  }
  ActualizarDepartamento(departamento: DepartamentoModelo):Observable<DepartamentoModelo>{
    return this.http.put<DepartamentoModelo>(`${this.url}/departamentos/${departamento.id}`,departamento,{
      
      headers: new HttpHeaders({
        'Authorization':`Bearer ${this.token}`
      })
    })
  }
  EliminarDepartamento(id: number):Observable<boolean>{
    return this.http.delete<boolean>(`${this.url}/departamentos/${id}`,{
      headers: new HttpHeaders({
        'Authorization':`Bearer ${this.token}`
      })
    })

  }
  BuscarDepartamento(id: number):Observable<DepartamentoModelo>{
    //alert('El id es este'+id)
    return this.http.get<DepartamentoModelo>(`${this.url}/departamentos/${id}`,{
      
      headers: new HttpHeaders({
        'Authorization':`Bearer ${this.token}`
      })
    })
  }
  LitarDepartamentos():Observable<DepartamentoModelo[]>{
    return this.http.get<DepartamentoModelo[]>(`${this.url}/departamentos`,{
      headers: new HttpHeaders({
        'Authorization':`Bearer ${this.token}`
      })
    })
  }
}
