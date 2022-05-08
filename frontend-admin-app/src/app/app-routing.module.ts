import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { HomeComponent } from './home/home.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { NewsComponent } from './news/news.component';
import { UsersListComponent } from './users-list/users-list.component';
import { ChatComponent } from './chat/chat.component';
import { AuthGuard } from "./auth.guard";

const routes: Routes = [
  {path: "", component: HomeComponent, canActivate: [AuthGuard]},
  {path: "admin/login", component: LoginpageComponent},
  {path: "admin/chat", component: ChatComponent, canActivate: [AuthGuard]},
  {path: "admin/users", component: UsersListComponent, canActivate: [AuthGuard]},
  {path: "admin/events", component: EventsComponent, canActivate: [AuthGuard] },
  {path: "admin/news", component: NewsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
