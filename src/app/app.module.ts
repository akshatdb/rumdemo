import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatcompsModule } from './material/matcomps.module';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { FormComponent } from './components/form/form.component';
import { TableComponent } from './components/table/table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTableComponent } from './components/common/data-table/data-table.component';
import { LoggerService } from './services/logger.service';
import { LogDirective } from './directives/logger.directive';
import { HttpClientModule } from '@angular/common/http';
import { ForbiddenCharDirective } from './directives/pattern.directive';
import { FormErrorDirective } from './directives/error.directive';
import { RilTableLibModule } from 'ril-table-lib';
import { ChartsComponent } from './components/charts/charts.component';
import { BarChartComponent } from './components/common/bar-chart/bar-chart.component';
import { StackedBarChartComponent } from './components/common/stacked-bar-chart/stacked-bar-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    FooterComponent,
    HomeComponent,
    FormComponent,
    TableComponent,
    DataTableComponent,
    BarChartComponent,
    LogDirective,
    ForbiddenCharDirective,
    FormErrorDirective,
    ChartsComponent,
    StackedBarChartComponent
  ],
  imports: [
    BrowserModule,
    RilTableLibModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatcompsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [LoggerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
