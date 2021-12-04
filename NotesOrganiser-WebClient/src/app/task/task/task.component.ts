import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { TaskService } from 'src/app/services/task.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks:any;
  data:any;
  constructor(private _router: Router, private _user: UserService, private taskService: TaskService, private toastr: ToastrService) {
    this._user.getUser()
    .subscribe(
      data=>console.log(data),
      error=>this._router.navigate(['/login'])
    )
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.taskService.getData().subscribe(res => {
      console.log(res);
      this.tasks = res;
    });
  }
}
