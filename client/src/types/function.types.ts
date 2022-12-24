import { ChangeEvent, FormEvent } from "react";
import { GlobalState } from "./state.types";

export interface HandleInputChange {
  (event: ChangeEvent<HTMLInputElement>): void;
}

export interface HandleFormSubmit {
  (event: FormEvent<HTMLFormElement>): void;
}

export interface Reducer {
  (state: GlobalState, action: { type: string; payload?: any }): GlobalState;
}
