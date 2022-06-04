import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterLink, RouterLinkActive, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SeguridadService } from '../servicios/seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class VerificadorSesionGuard implements CanActivate {
  constructor(
    private servicioSeguridad: SeguridadService,
    private router: Router){
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let sesionActiva = this.servicioSeguridad.ObtenerToken()!="";
    if(sesionActiva){
       return true;
    }else{
      this.router.navigate(['/inicio']);
      return false;
    }

     
  }
  
}
