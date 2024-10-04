import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/bussiness/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
 
  @Input() title: string = "";

  constructor(private authService: AuthService){

  }


}
