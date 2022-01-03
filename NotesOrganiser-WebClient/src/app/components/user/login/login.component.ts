import { UserService } from 'src/app/services/user/user.service';
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
  data:any;
  loginForm:FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, Validators.required)
  })
  constructor(private _router: Router, private _user: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this._user.getUser()
    .subscribe(
      data=>this._router.navigate(['/settings'])
    );
  }

  moveToRegister(){
    this._router.navigate(['/register']);
  }

  login(){
    if(!this.loginForm.valid){
      console.log('Invalid Form');
      return;
    }

    this._user.login(JSON.stringify(this.loginForm.value)).subscribe(res => {
        this.data = res;
        this.toastr.success(JSON.stringify(this.data.code), JSON.stringify(this.data.message), {
          timeOut: 1500,
          progressBar: true
        });

      this._router.navigate(['/settings']);},
    );
  }
}
