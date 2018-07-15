import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { SessionStore, State } from './session.store';

@Injectable({
	providedIn: 'root'
})
export class SessionQuery extends Query<State> {
	isLoggedIn$ = this.select((state) => !!state.token);
	name$ = this.select((state) => state.name);

	constructor(protected store: SessionStore) {
		super(store);
	}

	hasSession() {
		return !!this.getSnapshot().token;
	}
}
