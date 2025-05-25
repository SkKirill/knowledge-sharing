import { Component } from '@angular/core';
import { ChatListComponent } from '../chat-list/chat-list.component';
import {ChatComponent} from '../chat/chat.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-exchange',
  imports: [ChatListComponent, ChatComponent, SearchBarComponent],
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css'],
  standalone: true
})
export class ExchangeComponent {

}
