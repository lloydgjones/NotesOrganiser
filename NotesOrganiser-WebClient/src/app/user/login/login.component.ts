import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, Validators.required)
  })
  constructor(private _router: Router, private _user: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  moveToRegister(){
    this._router.navigate(['/register']);
  }

  login(){
    if(!this.loginForm.valid){
      console.log('Invalid Form');
      return;
    }

    this._user.login(JSON.stringify(this.loginForm.value))
    .subscribe(
      data => {this.toastr.success(JSON.stringify(200), JSON.stringify(data),
      {
        timeOut: 1500,
        progressBar: true
      }); this._router.navigate(['/settings']);},
      error => this.toastr.error(JSON.stringify(401), JSON.stringify(error),
      {
        timeOut: 1500,
        progressBar: true
      })
    );
  }
}
