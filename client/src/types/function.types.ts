import { ChangeEvent, FormEvent } from "react";

export interface HandleInputChange {
  (event: ChangeEvent<HTMLInputElement>): void;
}

export interface HandleFormSubmit {
  (event: FormEvent<HTMLFormElement>): void;
}
