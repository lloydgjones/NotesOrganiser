import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  data: any;
  submitted=false;
  isPasswordVisible = false;
  registerForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    username: new FormControl(null, Validators.required),
    password1: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    password2: new FormControl(null, [Validators.required, Validators.minLength(8)])
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
    return this.registerForm.controls;
  }
  register(){
    this.submitted=true;

    if(!this.registerForm.valid || (this.registerForm.controls.password1.value != this.registerForm.controls.password2.value)){
      this.toastr.error("Invalid Registration Form", "Error", {
        timeOut: 2000,
        progressBar: true,
        positionClass: "toast-bottom-right"
      });
      return;
    }

    this._user.register(JSON.stringify(this.registerForm.value)).subscribe(
      res => {
        this.data = res;
        this.toastr.success(this.data.message, "Success", {
          timeOut: 2000,
          progressBar: true,
          positionClass: "toast-bottom-right"
        });

        this._router.navigate(['/login']);
      },
      err => {
        this.data = err;
        this.toastr.error(this.data.error.message, "Error", {
          timeOut: 2000,
          progressBar: true,
          positionClass: "toast-bottom-right"
        });
      }
    );
  }
}
