import { Component, EventEmitter, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private _usersService:UsersService,
              private _dataService:DataService) { }

  usersList:any[] = []
  selectedUserId;

  ngOnInit() {
    this.getUsers()
  }

  getUsers(){
    this._usersService.getUsers().subscribe((res:any[])=>{
      this.usersList = res;
    })
  }

  userSelected(user){
    this.selectedUserId = user.id;
    this._dataService.emitUserEvent(user);
  }
}
