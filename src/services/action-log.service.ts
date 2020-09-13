import { ActionLog } from './../models/action-log.model';
import axios, { AxiosInstance } from 'axios';
import { AddActionLog } from '../models/add-action-log.model';

export class ActionLogService {
  private http: AxiosInstance;

  constructor() {
    this.http = axios.create({ baseURL: 'http://localhost:5555'});
  }

  public getAllActionLogs = async (sessionId: string): Promise<ActionLog[]> => {
    try {
      const response = await this.http.get<ActionLog[]>(`/action-logs/session/${sessionId}`);
      if (response.data) {
        return response.data;
      }
      return [];
    } catch (error) {
      console.log('getAllActionLogs error: ', error);
      return [];
    }
  }

  public addActionLog = async (actionLog: AddActionLog): Promise<ActionLog> => {
    try {
      const response = await this.http.post<ActionLog>(`/action-logs`, actionLog);
      return response.data;
    } catch (error) {
      console.log('addActionLog error: ', error);
      return {} as ActionLog;
    }
  }
}
