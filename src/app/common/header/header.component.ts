import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/bussiness/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],  
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
 
  @Input() title: string = "";

  constructor(public authService: AuthService, private router: Router,
   ){

  }
  
  ngOnInit(): void {
   this.authService.loadUser();
  }

  
  onLogout(){
    this.router.navigateByUrl('/auth', { replaceUrl: true });
  }

}
