import { Routes } from '@angular/router';
import { Main } from './main/main';
import { System } from './main/system/system';
import { Check } from './main/check/check';
import { Page } from './main/page/page';
import { Category } from './main/category/category';
import { About } from './about/about';
import { Services } from './services/services';
import { Products } from './products/products';
import { Extra } from './extra/extra';

export const routes: Routes = [
    { path: 'main', component: Main,
    children: [
      { path: 'system', component: System },
      { path: 'check', component: Check },
      { path: 'page', component: Page },
      { path: 'category', component: Category }
    ]
    },
    { path: 'about', component: About },
    { path: 'services', component: Services },
    { path: 'product', component: Products },
    { path: 'extra', component: Extra },
    { path: '**', component: Main }
];
