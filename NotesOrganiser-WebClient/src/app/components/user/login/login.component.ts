import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  data: any;
  submitted=false;
  isPasswordVisible = false;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, Validators.required)
  })

  constructor(private _router: Router, private _user: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this._user.getUser().subscribe(
      res=>this._router.navigate(['/settings'])
    );
  }

  togglePasswordVisibility(){
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  get f() {
    return this.loginForm.controls;
  }
  login(){
    this.submitted=true;

    if(!this.loginForm.valid){
      this.toastr.error("Invalid Login Form", "Error", {
        timeOut: 3000,
        progressBar: true,
        positionClass: "toast-bottom-right"
      });
      return;
    }

    this._user.login(JSON.stringify(this.loginForm.value)).subscribe(
      res => {
        this.data = res;
        this.toastr.success(this.data.message, "Success", {
          timeOut: 3000,
          progressBar: true,
          positionClass: "toast-bottom-right"
        });

        this._router.navigate(['/settings']);
      }
    );
  }
}
