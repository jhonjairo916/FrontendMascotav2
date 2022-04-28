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
    private servicioSeguridad : SeguridadService
    ) 
    {
      this.token= this.servicioSeguridad.ObtenerToken();
      console.log('Tokennn'+this.token)
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
  EliminarDepartamento(departamento: DepartamentoModelo):Observable<any>{
    return this.http.delete<DepartamentoModelo>(`${this.url}/departamentos/${departamento.id}`,{
      headers: new HttpHeaders({
        'Authorization':`Bearer ${this.token}`
      })
    })

  }
  BuscarDepartamento(id: number):Observable<DepartamentoModelo>{
    return this.http.get<DepartamentoModelo>(`${this.url}/departamentos/${id}`,{
      headers: new HttpHeaders({
        //'Authentication':`Bearer ${this.token}`
      })
    })
  }
  LitarDepartamentos():Observable<DepartamentoModelo[]>{
    return this.http.get<DepartamentoModelo[]>(`${this.url}/departamentos`,{
      headers: new HttpHeaders({
        //'Authorization':`Bearer ${this.token}`
      })
    })
  }
}
