import { Injectable } from '@angular/core';
import {User} from '../../models/user/user.model';
import {Knowledge} from '../../models/knowledge/knowledge.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private users: User[] = [
    { id: 1, email: 'test@example.com', name: 'John Doe', skills: ['Angular', 'C#'], interests: ['PostgreSQL'] },
    { id: 2, email: 'jane@example.com', name: 'Jane Smith', skills: ['React', 'Node.js'], interests: ['MongoDB'] },
  ];

  private knowledge: Knowledge[] = [
    { id: 1, name: 'Angular', description: 'Frontend framework' },
    { id: 2, name: 'C#', description: 'Backend language' },
  ];

  constructor() { }

  getUsers(): User[] {
    return this.users;
  }

  getKnowledge(): Knowledge[] {
    return this.knowledge;
  }
}
