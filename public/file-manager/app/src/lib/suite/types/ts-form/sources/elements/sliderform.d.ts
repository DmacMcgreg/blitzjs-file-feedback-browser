import { Slider } from "../../../ts-slider";
import { IEventSystem } from "../../../ts-common/events";
import { Label } from "./helper/label";
import {
	ISliderFormConfig,
	ItemEvent,
	ISliderFormEventHandlersMap,
	ISliderForm,
	ISliderProps,
} from "../types";
export declare class SliderForm extends Label implements ISliderForm {
	config: ISliderFormConfig;
	slider: Slider;
	events: IEventSystem<ItemEvent, ISliderFormEventHandlersMap>;
	private _propsItem;
	private _propsSlider;
	private _props;
	constructor(container: any, config: ISliderFormConfig);
	destructor(): void;
	setProperties(propertyConfig: ISliderProps): void;
	getProperties(): ISliderProps;
	show(): void;
	hide(init?: boolean): void;
	isVisible(): boolean;
	disable(): void;
	enable(): void;
	isDisabled(): boolean;
	clear(): void;
	getValue(): number[];
	setValue(value: number | number[]): void;
	getWidget(): Slider;
	focus(extra?: boolean): void;
	blur(): void;
	protected _initView(config: ISliderFormConfig): void;
	protected _initHandlers(): void;
	protected _getRootView(): any;
	protected _drawSlider(): any;
}
