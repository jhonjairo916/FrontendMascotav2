import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioModelo } from 'src/app/modelos/Usuario.modelo';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import * as crypto from 'crypto-js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {
  //fgValidador: FormGroup= this.fb.group({});
  fgValidador = new FormGroup({});
  constructor(
    private fb: FormBuilder,
    private servicioSeguridad: SeguridadService,
    private router: Router) { }

  
  
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
    let modelo = new UsuarioModelo();
    modelo.username = user;
    modelo.clave = crypto.MD5(password).toString();
    this.servicioSeguridad.IdentificarUsuario(modelo).subscribe(
      (data: UsuarioModelo)=>{
        this.servicioSeguridad.GuardarDatosEnLocal(data);
        this.router.navigate(["/"]);
      },(error: any)=>{
        alert("Datos incorrectos.."+user+' '+password);
      }
    );
  }

}
