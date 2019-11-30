import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FormComponent } from './components/form/form.component';
import { TableComponent } from './components/table/table.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    data: {
      'title': 'Home',
      'icon': 'home'
    }
  },
  {
    path: 'form',
    component: FormComponent,
    data: {
      'title': 'Form page',
      'icon': 'work'
    }
  },
  {
    path: 'table',
    component: TableComponent,
    data: {
      'title': 'Table view',
      'icon': 'table_chart'
    }
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
