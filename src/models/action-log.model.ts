export interface ActionLog {
  id: number;
  sessionId: string;
  player: string;
  moveNo: number;
  logMessage: string;
  isGameOver: boolean;
  isGameDraw: boolean;
  timestamp: number;
}
