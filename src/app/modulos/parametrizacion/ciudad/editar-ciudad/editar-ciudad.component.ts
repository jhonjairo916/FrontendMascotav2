import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CiudadSinDptoModelo } from 'src/app/modelos/CiudadSinDepto.modelo';
import { DepartamentoModelo } from 'src/app/modelos/Departamento.modelo';
import { CiudadService } from 'src/app/servicios/ciudad.service';
import { DepartamentoService } from 'src/app/servicios/departamento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-ciudad',
  templateUrl: './editar-ciudad.component.html',
  styleUrls: ['./editar-ciudad.component.css']
})
export class EditarCiudadComponent implements OnInit {
  fgValidador = new FormGroup({});
  ciudad: CiudadSinDptoModelo = new CiudadSinDptoModelo();
  dptoListado: DepartamentoModelo[]=[]
  id: number=0
  constructor(
    private fb: FormBuilder,
    private servicioCiudad: CiudadService,
    private servicioDepartamento: DepartamentoService,
    private router: ActivatedRoute,
    private route: Router
    ) 
    {
      
    }

  ngOnInit(): void {
    this.CargarFormulario();
    this.id = this.router.snapshot.params['id'];
    
    this.BuscarCiudad();
    this.ListarDepartamento()
    
  }
 //Its used to load the departamentos in the options of the select field
  ListarDepartamento()
  {
    this.servicioDepartamento.LitarDepartamentos().subscribe(
      (datos)=>{
        this.dptoListado= datos //Its added the list to the array to be viewed in the select option
        //this.ObtenerFGV['departamentoId'].setValue(this.dptoListado)
      },
      (error:any)=>{
        alert("error listing the departamentos");
      }
    )
  }
  CargarFormulario(){
    this.fgValidador = this.fb.group({
      id:['',Validators.required],
      nombre:['',Validators.required],
      departamentoId:['',Validators.required]
    })
  }
  get ObtenerFGV(){
    return this.fgValidador.controls;
  }
  BuscarCiudad(){
    this.servicioCiudad.BuscarCiudad(this.id).subscribe((datos)=>{
      //this.ciudad = datos;
      //alert(this.ciudad.nombre)
      this.ObtenerFGV['id'].setValue(datos.id)
      this.fgValidador.controls['nombre'].setValue(datos.nombre);
      this.ObtenerFGV['departamentoId'].setValue(datos.departamentoId)
    },
    (error:any)=>{
      alert("error "+error)
    });
  }
  ActualizarCiudad(){
    this.ciudad.id = this.ObtenerFGV['id'].value;
    this.ciudad.nombre = this.ObtenerFGV['nombre'].value;
    this.ciudad.departamentoId = parseInt(this.ObtenerFGV['departamentoId'].value)
    //alert(this.ciudad.departamento)
    //TODO
    //delete this.ciudad.departamento.nombre;
   
    this.servicioCiudad.ActualizarCiudad(this.ciudad).subscribe(
      (datos)=>{
        Swal.fire(
          `The city ${datos.nombre} was updated succesfully`,
          'The list will be loaded..',
          'success'
        )
      },
      (error:any)=>{
        Swal.fire(
          'there was an error updating the city '+error.message,
          'Try it again?',
          'question'
        )
      },
      ()=>{
        this.route.navigate(['/parametros/listar-ciudad'])
      }
    )
  }
}
