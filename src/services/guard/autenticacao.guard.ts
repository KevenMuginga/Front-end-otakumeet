import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../login/login.service';

export const autenticacaoGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  
  const loginService = inject(LoginService);
  const router = inject(Router);
  
  const acesso = loginService.isLogeded();
  
  if(acesso){
    console.log("true")
    return true;
  }
  console.log("false")
  return router.navigate(['/login']);
};
