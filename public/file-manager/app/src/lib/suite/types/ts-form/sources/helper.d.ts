import { Validation, ValidationInputFn, IInputConfig } from "./types";
export declare function getFormItemCss(item: any, validate?: boolean, focus?: boolean): string;
export declare function getValidationMessage(item: any): any;
export declare function validateTemplate(template: Validation, str: any): boolean;
export declare function isBlock(config: any): any;
export declare function validateInput(
	value: string | number,
	validation: Validation | ValidationInputFn
): boolean;
export declare function baseInputValidate(value: string | number, config: IInputConfig): boolean;
export declare function isTimeFormat(value: string, timeFormat?: number): boolean;
export declare function isVerify(config: any): boolean;
export declare const baseProps: string[];
export declare const widgetConfig: ({
	width,
	type,
	id,
	name,
	hidden,
	editable,
	valueFormat,
	css,
	required,
	helpMessage,
	preMessage,
	successMessage,
	errorMessage,
	label,
	labelWidth,
	labelPosition,
	hiddenLabel,
	validation,
	icon,
	...res
}: any) => any;
