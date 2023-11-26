// @ts-ignore

export type SignIn = {
  username: string;
  password: string;
};

export type AccessToken = {
  access_token: string | undefined;
};

export type Payload = {
  username: string, sub: number
};
