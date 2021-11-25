import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'manager',
    loadChildren: () => import('./manager/manager.module').then( m => m.ManagerPageModule)
  },
  {
    path: 'history',
    children:[{
      path: '',
      loadChildren: () => import('./history/history.module').then( m => m.HistoryPageModule)
    },
    {
      path:':name',
      loadChildren: () => import('./history-detail/history-detail.module').then( m => m.HistoryDetailPageModule)
    }
  ]
    
  },
  {
    path: 'restock',
    loadChildren: () => import('./restock/restock.module').then( m => m.RestockPageModule)
  },
  {
    path: 'add-new-product',
    loadChildren: () => import('./add-new-product/add-new-product.module').then( m => m.AddNewProductPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
