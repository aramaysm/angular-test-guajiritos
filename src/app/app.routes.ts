import { Routes } from '@angular/router';

export const routes: Routes = [
    {
      path: "", redirectTo: "auth", pathMatch:"full"
    },
    {
      "path" : "auth",
      loadChildren: () => import("./modules/authentication/authentication.module").then(value => value.AuthenticationModule)
    },
    {
      "path" : "user",
      loadChildren: () => import("./modules/users-manager/users-manager.module").then(value => value.UsersManagerModule)
    },
    {
      "path" : "task",
      loadChildren: () => import("./modules/task-manager/task-manager.module").then(value => value.TaskManagerModule)
    },
    {
      path:"**", redirectTo:"ErrorPage", pathMatch:"full"
    }
  ];
