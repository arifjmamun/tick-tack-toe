import { Board } from "./../types/board";
import { Player } from "../types/player";
import { Result } from "../types/result";

const countInRow = (player: Player, row: string[]) =>
  row.filter((el) => el === player).length;
const hasWonInRow = (player: Player, row: string[]) =>
  countInRow(player, row) === 3;
export const hasThreatInRow = (player: Player, row: string[]) =>
  countInRow(player, row) === 2;

const countInColumn = (player: Player, colNumber: number, ...rows: string[][]) =>
  rows.map((row) => row[colNumber]).filter((el) => el === player).length;
const hasWonInColumn = (player: Player, colNumber: number, ...rows: string[][]) =>
  countInColumn(player, colNumber, ...rows) === 3;
export const hasThreatInColumn = (player: Player, colNumber: number, ...rows: string[][]) =>
  countInColumn(player, colNumber, ...rows) === 2;

const countInLeft = (player: Player, ...rows: string[][]) => {
  const [row0, row1, row2] = rows;
  return [row0[0], row1[1], row2[2]].filter((el) => el === player).length;
};
const hasWonInLeft = (player: Player, ...rows: string[][]) =>
  countInLeft(player, ...rows) === 3;
export const hasThreatInLeftSlant = (player: Player, ...rows: string[][]) =>
  countInLeft(player, ...rows) === 2;

const countInRightSlant = (player: Player, ...rows: string[][]) => {
  const [row0, row1, row2] = rows;
  return [row0[2], row1[1], row2[0]].filter((el) => el === player).length;
};
const hasWonInRight = (player: Player, ...rows: string[][]) =>
  countInRightSlant(player, ...rows) === 3;
export const hasThreatInRightSlant = (player: Player, ...rows: string[][]) =>
  countInRightSlant(player, ...rows) === 2;

export const getPlayerResult = (player: Player, board: Board): Result => {
  const rows = Object.keys(board).map((row) => board[row]);
  return [
    { line: "row0", won: hasWonInRow(player, board[0]) },
    { line: "row1", won: hasWonInRow(player, board[1]) },
    { line: "row2", won: hasWonInRow(player, board[2]) },
    { line: "column0", won: hasWonInColumn(player, 0, ...rows) },
    { line: "column1", won: hasWonInColumn(player, 1, ...rows) },
    { line: "column2", won: hasWonInColumn(player, 2, ...rows) },
    { line: "leftSlant", won: hasWonInLeft(player, ...rows) },
    { line: "rightSlant", won: hasWonInRight(player, ...rows) },
  ].reduce(
    (answer: Result, nextCheck) => {
      return nextCheck.won ? nextCheck : answer;
    },
    { won: false, line: undefined }
  );
};
