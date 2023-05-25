import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { TiendaComponent } from './tienda/tienda.component';
import { CartComponent } from './cart/cart.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { PerfilComponent } from './perfil/perfil.component';
import { DireccionesComponent } from './perfil/direcciones/direcciones.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { AuthGuard } from './services/auth.guard';
import { ContactoComponent } from './contacto/contacto.component';
import { PedidosComponent } from './perfil/pedidos/pedidos.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'shop', component: TiendaComponent },
  { path: 'cart', component: CartComponent },
  { path: 'direcciones', component: DireccionesComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard] },
  { path: 'check-out', component: CheckOutComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'pedidos', component: PedidosComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
