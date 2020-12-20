import { createContext } from 'react';

interface jwtContext {
  token: null | string,
  setJwt: Function
}

const defaultObj: jwtContext = {
  token: null,
  setJwt: (str: string) => { }
};

const JwtContext = createContext(defaultObj);

export default JwtContext;