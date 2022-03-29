import { ITimeObject, Timepicker } from "../../../ts-timepicker";
import { Label } from "./helper/label";
import { IEventSystem } from "../../../ts-common/events";
import {
	ITimePickerConfig,
	ITimePickerEventHandlersMap,
	ItemEvent,
	ITimePicker,
	ITimePickerProps,
} from "../types";
export declare class TimePicker extends Label implements ITimePicker {
	config: ITimePickerConfig;
	timepicker: Timepicker;
	events: IEventSystem<ItemEvent, ITimePickerEventHandlersMap>;
	private _keyManager;
	private _popup;
	private _isValid;
	private _popupIsFocus;
	private _propsItem;
	private _propsTimepicker;
	private _props;
	constructor(container: any, config: ITimePickerConfig);
	destructor(): void;
	setProperties(propertyConfig: ITimePickerProps): void;
	getProperties(): ITimePickerProps;
	show(): void;
	hide(init?: boolean): void;
	isVisible(): boolean;
	disable(): void;
	enable(): void;
	isDisabled(): boolean;
	validate(silent?: boolean, validateValue?: string | ITimeObject): boolean;
	clearValidate(): void;
	setValue(value: Date | number | string | any[] | ITimeObject): void;
	getValue(asOBject?: boolean): ITimeObject | string | any;
	focus(): void;
	blur(): void;
	clear(): void;
	getWidget(): Timepicker;
	protected _initView(config: ITimePickerConfig): void;
	protected _initHandlers(): void;
	protected _getHandlers(): {
		onfocus: () => void;
		onblur: () => void;
		oninput: (e: Event) => void;
	};
	protected _initHotkeys(): void;
	protected _draw(): any;
	private _clear;
	private _afterApply;
	private _applyTab;
}
