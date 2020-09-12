import { ActionType } from "./actionType";

export interface StartOver {
  type: ActionType;
};

export const startOver = (): StartOver => ({
  type: ActionType.START_OVER,
});
