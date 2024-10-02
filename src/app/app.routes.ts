import { Routes } from '@angular/router';

export const routes: Routes = [
    {
      path: "", redirectTo: "user", pathMatch:"full"
    },
    {
      "path" : "auth",
      loadChildren: () => import("./modules/users-manager/users-manager.module").then(value => value.UsersManagerModule)
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
