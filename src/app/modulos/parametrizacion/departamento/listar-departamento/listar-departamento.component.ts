import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DepartamentoModelo } from 'src/app/modelos/Departamento.modelo';
import { DepartamentoService } from 'src/app/servicios/departamento.service';


@Component({
  selector: 'app-listar-departamento',
  templateUrl: './listar-departamento.component.html',
  styleUrls: ['./listar-departamento.component.css']
})
export class ListarDepartamentoComponent implements OnInit {
  pagina:number = 1//Its used to paginate the list of departamentos
  listaDepartamentos: DepartamentoModelo[]=[]
  constructor(
    private servicioDepartamento: DepartamentoService,
    private router: Router) { }

  ngOnInit(): void {
    this.ListarDepartamentos();
  }
  ListarDepartamentos(){
    this.servicioDepartamento.LitarDepartamentos().subscribe(
      (datos)=>{
        this.listaDepartamentos=datos;
      },(error)=>{
        alert("error listing the data"+ error)
      })
  }
  VerificarEliminacion(id: number){
    this.servicioDepartamento.EliminarDepartamento(id).subscribe(
      (datos)=>{
        alert("Departamento deleted succesfully");
        //this.router.navigate(['./parametros/listar-departamento']);
        this.ListarDepartamentos()
      },(error)=>{
        alert("Error deleted departamento "+ error );
      })
  }

}
