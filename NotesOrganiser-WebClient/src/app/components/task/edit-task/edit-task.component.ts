import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Task } from 'src/app/models/task/task.model';
import { TaskService } from 'src/app/services/task/task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  isDoneLoading: boolean = false;
  task = new Task();
  id: any;
  data: any;
  submitted=false;
  normalisedTime: any;
  editTaskForm: FormGroup;

  constructor(private _router: Router, private taskService: TaskService, private formBuilder: FormBuilder, private route: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.getTaskData();
  }

  getTaskData(){
    this.taskService.getDataById(this.id).subscribe(
      res => {
        this.data = res;
        this.task = this.data;
        if(this.task.time != null) { this.normalisedTime = this.task.time.toLocaleString().replace('Z', '') }
        this.editTaskForm = this.formBuilder.group({
          name: [this.task.name, Validators.required],
          content: [this.task.content, [Validators.required, Validators.maxLength(300)]],
          time: [this.normalisedTime],
          tags: [this.task.tags],
          importance: [this.task.importance]
        });
        this.isDoneLoading = true;
      }
    );
  }

  get f() {
    return this.editTaskForm.controls;
  }
  editData() {
    this.submitted=true;

    if(this.editTaskForm.invalid) { return; }

    this.editTaskForm.value.tags = this.editTaskForm.value.tags.toString().split(',');

    this.taskService.editData(this.id, this.editTaskForm.value).subscribe(
      res => {
        this.data = res;
        this.toastr.success(this.data.message, "Success", {
          timeOut: 2000,
          progressBar: true,
          positionClass: "toast-bottom-right"
        });
      }
    );
  }

  deleteData(id) {
    if(confirm("Are you sure that you want to delete this task?")) {
      this.taskService.deleteData(id).subscribe(
        res => {
          this.data = res;
          this.toastr.success(this.data.message, "Success", {
            timeOut: 2000,
            progressBar: true,
            positionClass: "toast-bottom-right"
          });
          this.getTaskData();
          this._router.navigateByUrl('/tasks');
        }
      );
    }
  }
}
