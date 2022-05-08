import { Component } from '@angular/core';
import { translate } from '@angular/localize/src/utils';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend-app';
  userData: any = {};
  isLoggedIn: boolean = false

  constructor(private router: Router, private translate:TranslateService, public authService: AuthService){
    translate.setDefaultLang('en');
    translate.use('en');
    this.userData = this.authService.getAuthUser()
    this.isLoggedIn = this.authService.isLoggedIn()
  }

  Login(){
    this.router.navigateByUrl('login');
  }
  Events(){
    this.router.navigateByUrl('events');
  }
  News(){
    this.router.navigateByUrl('news');
  }
  Study(){
    this.router.navigateByUrl('study');
  }
  Aboutus(){
    this.router.navigateByUrl('about');
  }
  info(){
    this.router.navigateByUrl('info');
  }
  chat(){
    this.router.navigateByUrl('chat');
  }

  languageSwitch(lang:string){
    this.translate.use(lang);
  }
  
  Logout(){
    this.authService.logout()
  }
 
}
