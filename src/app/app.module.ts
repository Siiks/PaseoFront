import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderLayoutComponent } from './layouts/header-layout/header-layout.component';
import { FooterLayoutComponent } from './layouts/footer-layout/footer-layout.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import * as cors from 'cors';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { SuccessMessageComponent } from './success-message/success-message.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ProductsTableComponent } from './admin-dashboard/products-table/products-table.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { EditAddProductComponent } from './admin-dashboard/products-table/edit-add-product/edit-add-product.component';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderLayoutComponent,
    FooterLayoutComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ErrorMessageComponent,
    SuccessMessageComponent,
    AdminDashboardComponent,
    ProductsTableComponent,
    PaginatorComponent,
    EditAddProductComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [MdbModalService,],
  bootstrap: [AppComponent]
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cors()) // agregar la configuración de cors
      .forRoutes('*');
  }
}
