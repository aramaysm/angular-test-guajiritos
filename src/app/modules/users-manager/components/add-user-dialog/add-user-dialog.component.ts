import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StatusTaskEnum } from '../../../../utils/enums/status_task.enum';
import { StatusUserEnum } from '../../../../utils/enums/status_user.enum';
import { AuthService } from '../../../../services/bussiness/auth.service';
import { UserRolEnum } from '../../../../utils/enums/userrol.enum';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrl: './add-user-dialog.component.css'
})
export class AddUserDialogComponent implements OnInit {

  userForm = new FormGroup({
    firstname : new FormControl('',[
      Validators.required,
      Validators.minLength(3),
    ]),
    lastname : new FormControl('',[
      Validators.required,
      Validators.minLength(2),
    ]),
    email : new FormControl('',[
      Validators.required,
      Validators.email,
    ]),
    password : new FormControl('',[
      Validators.required,
      Validators.minLength(4)
    ]),
    password_confirm : new FormControl('',[
      Validators.required,
      Validators.minLength(4),
      
    ]),
    age : new FormControl(18,),
   
  });
  
  status: string = StatusUserEnum.ACTIVATED;
  status_options = [
    {
      id: StatusUserEnum.ACTIVATED,
      name: StatusUserEnum.ACTIVATED,
    },
    {
      id: StatusUserEnum.UNAIVALAIBLE,
      name: StatusUserEnum.UNAIVALAIBLE,
    },
    
  ];

  constructor(
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService
  ) {
    
  }

  get firstname() {
    return this.userForm.get('firstname');
  }
  get lastname() {
    return this.userForm.get('lastname');
  }
  get email() {
    return this.userForm.get('email');
  }
  get age() {
    return this.userForm.get('age');
  }
  get password() {
    return this.userForm.get('passwword');
  }
  get password_confirm(){
    return this.userForm.get("password_confirm")
  }
  
  
  ngOnInit(): void {
    this.authService.loadUser();

    if (this.data.params !== undefined) {
      this.userForm.patchValue({
        firstname: this.data.params.firstname,
        lastname : this.data.params.lastname,
        email: this.data.params.email,
        age: this.data.params.age,
        
      });
        
     this.status = this.data.params.status;     
    }
  }

  onClose() {  
    this.dialogRef.close();
  }

  onChangeSelectStatus($event: any) {
    this.status = $event.target.value;
  }

  onSave(){
    if(!this.data.params){      
      if(this.password?.value === ""){
        alert("Error, la contraseña es requerida");
      }
      else if(this.userForm.value.password_confirm !== this.userForm.value.password) {
        alert("Error, las contraseñas no coinciden");
      }
       
      else{
        const data = {
          id: this.data ? this.data.params?.id : null,
          firstname: this.userForm.value.firstname,
          lastname: this.userForm.value.lastname,
          email: this.userForm.value.email,
          password: this.userForm.value.password,
          age: this.userForm.value.age,
          status: this.status,
          rol: (this.authService.token.rol === UserRolEnum.ADMIN) ? 2 : 1
        }
        this.dialogRef.close(data);
      }
    }
    else{
      const data = {
        id: this.data ? this.data.params?.id : null,
        firstname: this.userForm.value.firstname,
        lastname: this.userForm.value.lastname,
        email: this.userForm.value.email,
        password: this.userForm.value.password,
        age: this.userForm.value.age,
        status: this.status,
        rol: this.data.params?.rol 
      
      }
      this.dialogRef.close(data);
    }
   
  }

}
