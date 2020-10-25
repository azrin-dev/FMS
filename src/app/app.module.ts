import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './layout/nav/nav.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SectorsComponent } from './charts/sectors/sectors.component';
import { ClassComponent } from './charts/class/class.component';
import { IntroComponent } from './charts/intro/intro.component';
import { StatesConstructionComponent } from './charts/states-construction/states-construction.component';
import { StatesManufacturingComponent } from './charts/states-manufacturing/states-manufacturing.component';
import { BodyComponent } from './layout/body/body.component';
import { FooterComponent } from './layout/footer/footer.component';
import { StateSectorHistoryComponent } from './charts/state-sector-history/state-sector-history.component';
import { StatesSectorComponent } from './charts/states-sector/states-sector.component';
import { LineChartComponent } from './charts/intro/line-chart/line-chart.component';
import { LineChartService } from './charts/intro/line-chart/line-chart.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { MindMapComponent } from './charts/intro/mind-map/mind-map.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserModule } from './user/user.module';
import { ClickableComponent } from './charts/configs/clickable/clickable.component';
import { StateSectorForecastComponent } from './charts/state-sector-forecast/state-sector-forecast.component';
import { RegressionComponent } from './charts/regression/regression.component';
import { PagesComponent } from './pages/pages.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SidenavComponent } from './pages/dashboard/sidenav/sidenav.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SectorsComponent,
    ClassComponent,
    IntroComponent,
    StatesConstructionComponent,
    StatesManufacturingComponent,
    BodyComponent,
    FooterComponent,
    StateSectorHistoryComponent,
    StatesSectorComponent,
    LineChartComponent,
    MindMapComponent,
    ClickableComponent,
    StateSectorForecastComponent,
    RegressionComponent,
    PagesComponent,
    DashboardComponent,
    SidenavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxChartsModule,
    FlexLayoutModule,
    CommonModule,
    HttpClientModule,
    NgxGraphModule,
    MaterialModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    UserModule
  ],
  providers: [
     LineChartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
