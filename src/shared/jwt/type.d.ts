export type JwtType = {
  username: string;
  schema: string;
  usersTypesId: number;
  userId: number;
};

export type IJWT = {
  generation(params: JwtType): Promise<string>;
  deserialize(jwt: string): Promise<JwtType>;
};
