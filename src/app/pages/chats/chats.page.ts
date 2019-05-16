import { ChatService } from './../../services/chat.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import {map, take} from 'rxjs/operators'

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {

  groups: Observable<any>;

  constructor(private auth: AuthService, private router: Router, private chatService: ChatService) { }

  ngOnInit() {
    this.groups = this.chatService.getGroups();
    
  }


  openProfile() {

  }

  signOut() {
    this.auth.signOut().then(() => {
      this.router.navigateByUrl('/login');
    });
  }

}
