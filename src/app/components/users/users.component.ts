import { Component, EventEmitter, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { DataService } from 'src/app/services/data.service';
import { AngularBootstrapToastsService } from 'angular-bootstrap-toasts';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private _usersService:UsersService,
              private _dataService:DataService,
              private _toast:AngularBootstrapToastsService) { }

  usersList:any[] = []
  selectedUserId;

  ngOnInit() {
    this.getUsers()
  }

  getUsers(){
    this._usersService.getUsers().subscribe((res:any[])=>{
      this.usersList = res;
    },error=>{
      this._toast.showSimpleToast({text:'An error occurred in the server',bodyClass:"danger"})
    })
  }

  userSelected(user){
    this.selectedUserId = user.id;
    this._dataService.emitUserEvent(user);
  }
}
