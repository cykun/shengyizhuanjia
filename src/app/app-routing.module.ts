import { StartAppGuard } from './core/start-app.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [StartAppGuard]
  },
  {
    path: 'guide',
    loadChildren: () => import('./routes/guide/guide.module').then(m => m.GuidePageModule)
  },
  {
    path: 'passport',
    loadChildren: () => import('./routes/passport/passport.module').then(m => m.PassportModule)
  },
  {
    path: 'product',
    loadChildren: () => import('./routes/product/product.module').then(m => m.ProductModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
