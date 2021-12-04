import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { TaskService } from 'src/app/services/task.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  data;
  form:FormGroup;
  submitted=false;
  constructor(private _router: Router, private _user: UserService, private taskService: TaskService, private formBuilder: FormBuilder, private toastr: ToastrService) {
    this._user.getUser()
    .subscribe(
      data=>console.log(data),
      error=>this._router.navigate(['/login'])
    )
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.createForm();
  }

  get f() {
    return this.form.controls;
  }
  insertData() {
    this.submitted=true;

    if(this.form.invalid) {
        return;
      }

    this.taskService.insertData(this.form.value).subscribe(res => {
      this.data = res;
      this.toastr.success(JSON.stringify(this.data.code), JSON.stringify(this.data.message), {
        timeOut: 1500,
        progressBar: true
      });
      this._router.navigateByUrl('/tasks');
    });
  }
}
