import { Routes } from '@angular/router';

import { ProductDetailComponent } from '@products/pages/product-detail/product-detail.component';
import { LayoutComponent } from '@shared/components/layout/layout.component';
import { NotFoundComponent} from './domains/info/pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import ('./domains/products/pages/list/list.component')
      },
      {
        path: 'about',
        loadComponent: () => import('./domains/info/pages/about/about.component')
      },
      {
        path: 'product/:id',
        component: ProductDetailComponent
      }

    ]
  },

  {
    path: '**',
    component: NotFoundComponent
  }

];
