import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';
import { Product } from '../models/product';
import { User } from '../models/user';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  constructor(){}

  ngOnInit(): void {

  }

}
