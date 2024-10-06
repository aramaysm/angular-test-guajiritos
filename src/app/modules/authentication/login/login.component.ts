import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../services/bussiness/auth.service';
import { DialogService } from '../../../services/bussiness/dialog.service';
import { DialogType } from '../../../utils/enums/dialog-type.enum';
import { Router } from '@angular/router';
import { UserRolEnum } from '../../../utils/enums/userrol.enum';
 
@Component({
  selector: 'app-login',  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {



  loginForm = new FormGroup({   
    email : new FormControl('',[
      Validators.required,
      Validators.email,
    ]),
    password : new FormControl('',[
      Validators.required,
      Validators.minLength(4)
    ]),
    
  });

  constructor(private authService: AuthService, private dialogService: DialogService, private router: Router,){

  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('passwword');
  }


  onSave(){
    this.authService.login({
      email: this.loginForm.value.email ? this.loginForm.value.email : "",
      password: this.loginForm.value.password ? this.loginForm.value.password : ""
    }).subscribe(
      (next)=>{
     
      if(next.rol === UserRolEnum.ADMIN || next.rol === UserRolEnum.SUPERADMIN )
      this.router.navigateByUrl('/user', { replaceUrl: true });
    else
    this.router.navigateByUrl('/task', { replaceUrl: true });
    },
    (err)=>{
      this.dialogService.openGenericAlert(DialogType.DT_ERROR,"Error", err)
    }
  );
  }

}
