import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() {

   }

  //#region user Emit 
  private userEvent = new Subject<any>();
  public userEvent$ = this.userEvent.asObservable();

  /**
   * when user clicked
   * @param user transfer the user who clicked
   */
  emitUserEvent(user: any){
    this.userEvent.next(user);
  }
  //#endregion

  //#region post Emit 
  private postEvent = new Subject<any>();
  public postEvent$ = this.postEvent.asObservable();

  /**
   * when post clicked
   * @param post transfer the post who clicked
   */
  emitPostEvent(post: any){
    this.postEvent.next(post);
  }
  //#endregion

}
