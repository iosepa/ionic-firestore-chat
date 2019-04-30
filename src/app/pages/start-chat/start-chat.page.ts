import { Router } from '@angular/router';
import { ChatService } from './../../services/chat.service';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-start-chat',
  templateUrl: './start-chat.page.html',
  styleUrls: ['./start-chat.page.scss'],
})
export class StartChatPage implements OnInit {

  users = [];
  title = '';
  participant = '';

  constructor(private chatService: ChatService, private router: Router) { }

  ngOnInit() {
  }


  addUser() {
    let obs = this.chatService.findUser(this.participant);

    forkJoin(obs).subscribe(res => {
      for (let uData of res) {
        if (uData.length > 0) {
          this.users.push(uData[0])
        }
      }
      this.participant = '';
    });
  }

  createGroup() {
    console.log(this.title, this.users)
    this.chatService.createGroup(this.title, this.users).then(res => {
      this.router.navigateByUrl('/chats');
    })
  }
}
