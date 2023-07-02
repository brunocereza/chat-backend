export type JwtType = {
  username: string;
  _id: string;
  iat: string;
  exp: string;
};

export type JwtProps = {
  username: string;
  _id: string;
};

export type IJWT = {
  generation(params: JwtProps): Promise<string>;
  deserialize(jwt: string): Promise<JwtType>;
};
