import { IAuthRepository } from './type';

const usersRepository: IAuthRepository = {
  getToken: async (id: number): Promise<void> => {
    console.log(id);
  },
};

export default usersRepository;
