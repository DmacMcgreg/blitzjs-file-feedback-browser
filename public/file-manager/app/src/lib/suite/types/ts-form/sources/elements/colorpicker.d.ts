import { Colorpicker } from "../../../ts-colorpicker";
import { IEventSystem } from "../../../ts-common/events";
import { Label } from "./helper/label";
import {
	IColorPickerConfig,
	ItemEvent,
	IColorPickerEventHandlersMap,
	IColorPicker,
	IColorpickerProps,
} from "../types";
export declare class ColorPicker extends Label implements IColorPicker {
	config: IColorPickerConfig;
	colorpicker: Colorpicker;
	events: IEventSystem<ItemEvent, IColorPickerEventHandlersMap>;
	private _keyManager;
	private _popup;
	private _isValid;
	private _popupIsFocus;
	private _propsItem;
	private _propsColorpicker;
	private _props;
	constructor(container: any, config: IColorPickerConfig);
	destructor(): void;
	setProperties(propertyConfig: IColorpickerProps): void;
	getProperties(): IColorpickerProps;
	show(): void;
	hide(init?: boolean): void;
	isVisible(): boolean;
	disable(): void;
	enable(): void;
	isDisabled(): boolean;
	validate(silent?: boolean, validateValue?: string): boolean;
	clearValidate(): void;
	setValue(value: string): void;
	getValue(): string;
	clear(): void;
	getWidget(): Colorpicker;
	focus(): void;
	blur(): void;
	protected _initView(config: IColorPickerConfig): void;
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
