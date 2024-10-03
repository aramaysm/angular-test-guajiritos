import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/bussiness/auth.service';
import { UserRolEnum } from '../../utils/enums/userrol.enum';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent  implements OnInit {
  

  isActive: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  private authService:AuthService
  ) {
    
  }

  ngOnInit(): void {
    if (this.router.url.includes('user')) this.isActive = 0;
    else if (this.router.url.includes('task')) this.isActive = 1;
  }


  onClick(url: string) {
    const status = localStorage.getItem('status');

     switch (url) {
        case '/user':
          this.isActive = 0;
          break;
        case '/task':
          this.isActive = 1;
          break;
        
        default:
          this.isActive = 1;
          break;
      }
      this.router.navigateByUrl(url, { replaceUrl: true });
   
  }

  get isAdministrator() {
    const adminRol = UserRolEnum.ADMIN;

    return adminRol.toString().includes(this.authService?.token?.rol);
  }

}
