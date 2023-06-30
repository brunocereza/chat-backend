export type IAuthController = {
  login: (params: string) => Promise<void>;
};
