import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthFacade } from '@starter/state';

@Component({
  selector: 'starter-login',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  form: FormGroup = new FormGroup({
    email: new FormControl('', Validators.email),
    password: new FormControl(''),
    phone: new FormControl(''),
    name: new FormControl(''),
  });

  constructor(
    private authFacade: AuthFacade
  ) {}


  submit() {
    this.authFacade.register({...this.form.value});
  }

}
