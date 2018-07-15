import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { Session, createSession } from './session.model';
import { clearSesssion, saveSession } from '../storage';

export interface State extends Session {
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'auth' })
export class SessionStore extends Store<State> {

  constructor() {
    super(createSession());
  }

  login( session: Session ) {
    this.update(session);
    saveSession(session);
  }

  logout() {
    clearSesssion();
    this.update(createSession());
  }

}