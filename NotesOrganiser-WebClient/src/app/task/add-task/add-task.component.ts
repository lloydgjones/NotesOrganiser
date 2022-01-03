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
  data: any;
  addTaskForm: FormGroup;
  submitted=false;
  email: String;
  constructor(private _router: Router, private _user: UserService, private taskService: TaskService, private formBuilder: FormBuilder, private toastr: ToastrService) {
  }

  createForm() {
    this.addTaskForm = this.formBuilder.group({
      account: '',
      name: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.createForm();

    this._user.getUser()
    .subscribe(
      data=>this.getAccount(data),
      error=>this._router.navigate(['/login'])
    );
  }

  getAccount(data){
    this.email = data.email;
    this.addTaskForm.controls['account'].setValue(this.email);
  }

  get f() {
    return this.addTaskForm.controls;
  }
  insertData() {
    this.submitted=true;

    if(this.addTaskForm.invalid) {
        return;
      }

    this.taskService.insertData(this.addTaskForm.value).subscribe(res => {
      this.data = res;
      this.toastr.success(JSON.stringify(this.data.code), JSON.stringify(this.data.message), {
        timeOut: 1500,
        progressBar: true
      });
      this._router.navigateByUrl('/tasks');
    });
  }
}
