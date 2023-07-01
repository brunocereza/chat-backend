import mongoose, { SessionStarter } from 'mongoose';

const HOST = process.env.HOST || '';

export class DatabaseManager {
  async connectInit(): Promise<SessionStarter> {
    const connection = await mongoose.connect(HOST);
    return connection.connection;
  }

  async disconnectInit(): Promise<void> {
    const statusConection = await mongoose.disconnect();
    console.log(statusConection, 'desconectando');
  }
}
