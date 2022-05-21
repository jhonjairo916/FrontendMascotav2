import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CiudadModelo } from 'src/app/modelos/Ciudad.modelo';
import { CiudadService } from 'src/app/servicios/ciudad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-ciudad',
  templateUrl: './listar-ciudad.component.html',
  styleUrls: ['./listar-ciudad.component.css']
})
export class ListarCiudadComponent implements OnInit {
  listaCiudades: CiudadModelo[]=[]
  pagina: number = 1;//Its used to paginate the list of citys
  constructor(
    private servicioCiudad: CiudadService,
    private route: Router) { }

  ngOnInit(): void {
    this.ListarCiudad()
  }

  ListarCiudad()
  {
     this.servicioCiudad.LitarCiudad().subscribe(
      (datos)=>{
        this.listaCiudades = datos;
     },
     (error:any)=>{
        alert("It was´nt possible to list the ciudades "+error)
     })
  }
  VerificarEliminacion(id:number){
    Swal.fire({
      title: 'Do you want to delete the city?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't Delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.servicioCiudad.EliminarCiudad(id).subscribe(()=>{
          Swal.fire('City deleted succesfully', '', 'success')
          this.ListarCiudad();
          this.route.navigate(['/parametros/listar-ciudad'])
        },
        (error:any)=>{
          Swal.fire(
            'There is an error '+ error.message,
            'Try it again',
            'question'
          )
        },
        )
      } 
    })
    
  }

}
