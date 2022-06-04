import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SeguridadService } from '../servicios/seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class VerificadorNosesionGuard implements CanActivate {
  constructor(private servicioSeguridad: SeguridadService,
    private router: Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let sesionActiva = this.servicioSeguridad.ObtenerToken()=="";
      if(sesionActiva){
         return true;
      }else{
        this.router.navigate(['/inicio']);
        return false;
      }
  }
  
}
