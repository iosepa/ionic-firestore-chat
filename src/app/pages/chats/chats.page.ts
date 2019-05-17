import { ChatService } from './../../services/chat.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import {map, take, tap} from 'rxjs/operators'

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {

  groups: Observable<any>;
  testing: Observable<any>;
  newMessageGroups: Array<string> = [];

  constructor(private auth: AuthService, private router: Router, private chatService: ChatService) { }

  ngOnInit() {
    this.getGroups();
  }




  getGroups(){
    //get groups and see if there are new messages in the group
    this.groups = this.chatService.getGroups().pipe(
      map(groups => {
        for (let group of groups) {
          group.forEach(info => {
            info['users'].forEach(user => {
              if (user.id === this.auth.currentUserId && !user['seenLatest'])
                this.newMessageGroups.push(info['id'])
            });
          })
        }
        return groups;
      })
    );
  }




  openProfile() {

  }

  signOut() {
    this.auth.signOut().then(() => {
      this.router.navigateByUrl('/login');
    });
  }

}
