import { Observable } from '@nativescript/core';

export enum UserRole {
  PASTOR = 'PASTOR',
  EX_PASTOR = 'EX_PASTOR',
  LEADER = 'LEADER',
  WORKER = 'WORKER',
  SECRETARY = 'SECRETARY',
  MEDIA = 'MEDIA',
  MEMBER = 'MEMBER'
}

export class User extends Observable {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  groups: string[];
  
  constructor(data: Partial<User>) {
    super();
    Object.assign(this, data);
    this.groups = data.groups || [];
  }
}