import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from 'src/app/services/task/task.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  isDoneLoading: boolean = false;
  data: any;
  tasks: any[];
  email: String;

  constructor(private _router: Router, private _user: UserService, private taskService: TaskService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this._user.getUser()
    .subscribe(
      data=>this.getAccount(data),
      error=>this._router.navigate(['/login'])
    );
  }

  getAccount(data){
    this.email = data.email;
    this.getData();
  }

  getData() {
    this.taskService.getDataByUser(this.email).subscribe(
      res => {
        this.tasks = Object.keys(res).map(index => { let task = res[index]; return task; });
        this.isDoneLoading = true;
      }
    );
  }

  deleteData(id) {
    this.taskService.deleteData(id).subscribe(
      res => {
        this.data = res;
        this.toastr.error(JSON.stringify(this.data.message), "", {
          timeOut: 2000,
          progressBar: true,
          positionClass: "toast-bottom-right"
        });

        this.getData();
      }
    );
  }
}
