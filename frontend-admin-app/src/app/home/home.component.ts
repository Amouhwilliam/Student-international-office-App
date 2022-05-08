import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from '../auth.service';
import { AppToastService } from '../toast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  toastService: any

  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    toastService: AppToastService
  ) { 
    this.registerForm= this.formBuilder.group({
      first_name: ['',  Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      address: [''],
      phone: ['', Validators.required],
      type: ['', Validators.required],
      birthdate: [''],
      profile_picture: ['']
    })
    this.toastService = toastService
  }

  ngOnInit(): void {
  }

  get f() { return this.registerForm.controls; }

  registerUser() {
    this.submitted = true;
    if(this.registerForm.value.type.length !== 0){
      this.authService.register(this.registerForm.value).subscribe((res) => {
        console.log(res);  
        this.registerForm.reset()
        this.toastService.show('Operation succeed', 'Account created successfully', 'success') 
      }, 
      (err) => {
        console.log(err);  
        this.toastService.show('Oups, An error occur', 'Error: Please correct your input.', 'error') 
      })
    } else {
      alert('Please correct your input')
    }
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

}
