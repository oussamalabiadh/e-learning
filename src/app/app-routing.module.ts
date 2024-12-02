import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path: 'public', loadChildren: () => import('./public/public.module').then(m => m.PublicModule) }, 
   { path: '', redirectTo: '/public', pathMatch: 'full' }, // Redirection par défaut

  { path: 'user',  canActivate: [authGuard],loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  { path: 'admin',  canActivate: [authGuard],loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'instructor',  canActivate: [authGuard],loadChildren: () => import('./instructor/instructor.module').then(m => m.InstructorModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
