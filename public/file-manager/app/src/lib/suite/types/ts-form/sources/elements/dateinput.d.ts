import { Calendar } from "../../../ts-calendar";
import { IEventSystem } from "../../../ts-common/events";
import { Label } from "./helper/label";
import {
	IDatePickerConfig,
	IDatePickerEventHandlersMap,
	ItemEvent,
	IDatePicker,
	IDatePickerProps,
} from "../types";
export declare class DatePicker extends Label implements IDatePicker {
	config: IDatePickerConfig;
	calendar: Calendar;
	events: IEventSystem<ItemEvent, IDatePickerEventHandlersMap>;
	private _keyManager;
	private _popup;
	private _isValid;
	private _popupIsFocus;
	private _propsItem;
	private _propsCalendar;
	private _props;
	constructor(container: any, config: IDatePickerConfig);
	destructor(): void;
	setProperties(propertyConfig: IDatePickerProps): void;
	getProperties(): IDatePickerProps;
	show(): void;
	hide(init?: boolean): void;
	isVisible(): boolean;
	disable(): void;
	enable(): void;
	isDisabled(): boolean;
	validate(silent?: boolean, validateValue?: string | Date): boolean;
	clearValidate(): void;
	setValue(value: string | Date): void;
	getValue<T extends boolean = false>(asDateObject?: T): string | Date;
	focus(): void;
	blur(): void;
	clear(): void;
	getWidget(): Calendar;
	protected _initView(config: IDatePickerConfig): void;
	protected _initHandlers(): void;
	protected _getHandlers(): {
		onblur: () => void;
		onfocus: () => void;
		oninput: (e: Event) => void;
		onchange: (e: Event) => void;
	};
	protected _initHotkeys(): void;
	protected _draw(): any;
	private _applyTab;
}
