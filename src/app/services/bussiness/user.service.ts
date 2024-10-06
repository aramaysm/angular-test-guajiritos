import { EventEmitter, Injectable, Output } from '@angular/core';
import { UserApiService } from '../api/user-api.service';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  usersList: User[] = [];
  @Output() evGetAll = new EventEmitter<User[]>();

  constructor(private userServiceAPI: UserApiService) {
    this.getAllUser();
  }

  getAllUser() {
    this.userServiceAPI.getAllUserAPI().subscribe((users) => {
      this.usersList = users;

      this.evGetAll.emit(users);
    });
  }

  createUser(newData: any): Observable<User> {
    return this.userServiceAPI.createUserAPI(newData);
  }

  updateUser(newData: any): Observable<User> {
    return this.userServiceAPI.editUserAPI(newData);
  }

  getUserByName(name: string): any {
    const user = this.usersList.find(
      (item) =>
        item.firstname.includes(name) ||
        item.lastname.includes(name) ||
        item.firstname + ' ' + item.lastname === name
    );
    if (user) return user;
    else return undefined;
  }

  getUserById(id: number): any {
    if (this.usersList && this.usersList.length === 0) {
      this.getAllUser();
    }
    const user = this.usersList.find((item) => item.id === id);
    if (user) return user.firstname + ' ' + user.lastname;
    else return undefined;
  }

  deleteUser(newData: any) {
    return this.userServiceAPI.deleteUserAPI(newData);
  }

  getUserByRol(rol: number) {
    return this.userServiceAPI.getUserByRol(rol).subscribe((users) => {
      this.usersList = users;
      this.evGetAll.emit(users);
    });
  }

  getUsersActive() {
    return this.userServiceAPI.getUserActive();
  }
}
