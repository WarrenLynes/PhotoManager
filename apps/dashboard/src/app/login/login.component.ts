import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthFacade } from '@starter/state';

@Component({
  selector: 'starter-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form: FormGroup = new FormGroup({
    email: new FormControl('', Validators.email),
    password: new FormControl('')
  });

  constructor(
    private authFacade: AuthFacade
  ) {}


  submit() {
    this.authFacade.authenticate({...this.form.value});
  }

}
