import { CHANGE_NUM } from "./actionTypes";

export function change(num, value) {
  return {
    type: CHANGE_NUM,
    num,
    value
  };
}
