import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-layout',
  templateUrl: './header-layout.component.html',
  styleUrls: ['./header-layout.component.scss']
})
export class HeaderLayoutComponent implements OnInit {
  
  ngOnInit(): void {
    this.esAdministrador();
  }

  esAdministrador(): boolean {
    if(localStorage.getItem('roles').includes("USER")){
      return true;
    }
    return false;
  }
}
