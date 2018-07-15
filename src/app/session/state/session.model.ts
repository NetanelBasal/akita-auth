import { getSession } from '../storage';

export type Session = {
  token: string;
  name: string;
}

export type Creds = {
  email: string;
  password: string;
}

export function createSession(params: Partial<Session> = {}) {
  return {
    token: null,
    name: null,
    ...getSession(),
    ...params
  } as Session;
}