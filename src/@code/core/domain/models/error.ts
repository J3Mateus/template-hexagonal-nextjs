"use client"

import { ErrorType } from "@typing/index";
import { ERROR_MESSAGES } from "@language/error";

class AppError extends Error {
	private _type!: ErrorType;

	constructor(message: string) {
		super(message);
		this._type = ErrorType.UNKNOWN;
		this.name = "AppError";
	}

	get type(): ErrorType {
		return this._type;
	}

	get isUnprocessableEntity(): boolean {
		return this._type === ErrorType.UNPROCESSABLE_ENTITY;
	}

	get isUnknown(): boolean {
		return this._type === ErrorType.UNKNOWN;
	}


	static UnprocessableEntity(message: string): AppError {
		const error = new AppError(message);
		error._type = ErrorType.UNPROCESSABLE_ENTITY;
		return error;
	}

	static Unknown(message: string = ERROR_MESSAGES.UNEXPECTED): AppError {
		const error = new AppError(message);
		error._type = ErrorType.UNKNOWN;
		return error;
	}
}

export { AppError };