import { Player } from "../types/player";

export interface AddActionLog {
  sessionId: string;
  row: number;
  moveNo: number;
  player: Player;
  isGameOver?: boolean;
  isGameDraw?: boolean;
}
