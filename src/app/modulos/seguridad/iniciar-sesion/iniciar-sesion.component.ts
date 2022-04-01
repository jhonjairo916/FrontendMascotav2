import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {
  //fgValidador: FormGroup= this.fb.group({});
  fgValidador = new FormGroup({});
  constructor(private fb: FormBuilder) { }

  
  
  ConstruirFormulario(){
    this.fgValidador = this.fb.group({
      'email':['',[Validators.required],[Validators.email]],
      'password':['',[Validators.required]]
    })
  }
  ngOnInit(): void {
    this.ConstruirFormulario()
  }
  //This method its called from the graphic interface
  get ObtenerFgv(){
    return this.fgValidador.controls;
  }
  IdentificarUsuario(){
    let user =  this.ObtenerFgv['email'].value;
    let password = this.ObtenerFgv['password'].value;
  }

}
