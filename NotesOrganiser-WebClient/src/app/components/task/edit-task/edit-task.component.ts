import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from 'src/app/services/task/task.service';
import { Task } from 'src/app/models/task/task.model';
import { Router} from '@angular/router';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  task = new Task();
  id:any;
  data:any;
  constructor(private _router: Router, private taskService: TaskService, private route: ActivatedRoute, private toastr: ToastrService) { }

  editTaskForm = new FormGroup({
    name: new FormControl(''),
    content: new FormControl(''),
    time: new FormControl(''),
    weight: new FormControl('')
  })

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    console.log(this.id);
    this.getData();
  }

  getData(){
    this.taskService.getDataById(this.id).subscribe(
      res => {
        this.data = res;
        this.task = this.data;
        this.editTaskForm = new FormGroup({
          name: new FormControl(this.task.name),
          content: new FormControl(this.task.content),
          time: new FormControl(this.task.time),
          weight: new FormControl(this.task.weight)
        });
      }
    );
  }

  editData() {
    this.taskService.editData(this.id, this.editTaskForm.value).subscribe(
      res => {
        this.data = res;
        this.toastr.success(JSON.stringify(this.data.message), "Success", {
          timeOut: 2000,
          progressBar: true,
          positionClass: "toast-bottom-right"
        });
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
        this._router.navigateByUrl('/tasks');
      }
    );
  }
}
