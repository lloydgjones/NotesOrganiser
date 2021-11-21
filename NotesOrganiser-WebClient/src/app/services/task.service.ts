import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient: HttpClient) { }

  getData() {
    return this.httpClient.get(environment.apiUrl+'/tasks');
  }

  getDataById(id) {
    return this.httpClient.get(environment.apiUrl+'/task/'+id);
  }

  insertData(data) {
    return this.httpClient.post(environment.apiUrl+'/task/add', data);
  }

  editData(id, data) {
    return this.httpClient.put(environment.apiUrl+'/task/update/'+id, data);
  }

  deleteData(id) {
    return this.httpClient.delete(environment.apiUrl+'/task/'+id);
  }
}
