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
  isDoneLoading = false;
  isSortedByNameAsc = true;
  data: any;
  tasks: any[];
  email: String;

  constructor(private _router: Router, private _user: UserService, private taskService: TaskService, private toastr: ToastrService) { }

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
        this.sortByNameAsc();
        this.isDoneLoading = true;
      }
    );
  }

  sortByNameAsc() {
    this.tasks.sort((a,b) => a.name.localeCompare(b.name));
    this.isSortedByNameAsc = true;
  }

  sortByNameDesc() {
    this.tasks.sort((a,b) => b.name.localeCompare(a.name));
    this.isSortedByNameAsc = false;
  }

  deleteData(id) {
    if(confirm("Are you sure that you want to delete this note?")) {
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
}
