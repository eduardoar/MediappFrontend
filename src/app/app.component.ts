import { LoginService } from './_service/login.service';
import { Menu } from './_model/menu';
import { MenuService } from './_service/menu.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  menus: Menu[] = [];

  constructor(
    private menuService: MenuService,
    public loginService: LoginService){

  }

  ngOnInit(){
    this.menuService.menuCambio.subscribe(data =>{
      this.menus = data;
    });
  }
}
