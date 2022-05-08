import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { EventsComponent } from './events/events.component';
import { HomeComponent } from './home/home.component';
import { InfoComponent } from './info/info.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { NewsComponent } from './news/news.component';
import { StudyComponent } from './study/study.component';

import { AuthGuard } from "./auth.guard";
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [

  //{path: "", redirectTo: 'login', pathMatch: 'full' },
  {path: "", component: HomeComponent},
  {path: "login", component: LoginpageComponent},
  {path: "events", component: EventsComponent},
  {path: "news", component: NewsComponent},
  {path: "study", component: StudyComponent},
  {path: "about", component: AboutusComponent},
  {path: "info", component: InfoComponent},
  {path: "chat", component: ChatComponent, canActivate: [AuthGuard]},
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
