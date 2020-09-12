import { Move } from "./move";

export interface Board {
  [key: string]: Move[];
}
