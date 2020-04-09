import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FormComponent } from './components/form/form.component';
import { TableComponent } from './components/table/table.component';
import { ChartsComponent } from './components/charts/charts.component';


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
    path: 'chart',
    component: ChartsComponent,
    data: {
      'title': 'Chart view',
      'icon': 'table_chart'
    }
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
