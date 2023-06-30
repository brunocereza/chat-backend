export type IAuthRepository = {
  getToken: (id: number) => Promise<void>;
};
