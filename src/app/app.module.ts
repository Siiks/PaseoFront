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
import { EditAddProductComponent } from './admin-dashboard/products-table/edit-add-product/edit-add-product.component';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { UsersTableComponent } from './admin-dashboard/users-table/users-table.component';
import { EditAddUserComponent } from './admin-dashboard/users-table/edit-add-user/edit-add-user.component';
import { CategoryTableComponent } from './admin-dashboard/category-table/category-table.component';
import { EditAddCategoryComponent } from './admin-dashboard/category-table/edit-add-category/edit-add-category.component';
import { TiendaComponent } from './tienda/tienda.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CartComponent } from './cart/cart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



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
    EditAddProductComponent,
    ConfirmationModalComponent,
    UsersTableComponent,
    EditAddUserComponent,
    CategoryTableComponent,
    EditAddCategoryComponent,
    TiendaComponent,
    CartComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CarouselModule,
    BrowserAnimationsModule
  ],
  providers: [MdbModalService, ],
  bootstrap: [AppComponent]
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cors()) // agregar la configuración de cors
      .forRoutes('*');
  }
}
