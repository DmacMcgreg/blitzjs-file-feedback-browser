import { IEventSystem } from "../../../ts-common/events";
import { View } from "../../../ts-common/view";
import { DataCollection } from "../../../ts-data";
import { UploaderEvents, IParams } from "../../../ts-vault";
import { Popup } from "../../../ts-popup";
import {
	ISimpleVaultConfig,
	ISimpleVaultEventHandlersMap,
	ItemEvent,
	ISimpleVaultValue,
	ISimpleVault,
	ISimpleVaultProps,
} from "../types";
export declare class SimpleVault extends View implements ISimpleVault {
	events: IEventSystem<UploaderEvents | ItemEvent | ISimpleVaultEventHandlersMap | any>;
	data: DataCollection<ISimpleVaultValue>;
	protected _helper: Popup;
	private _uploader;
	private _handlers;
	private _dragover;
	private _dragoverTimeout;
	private _isValid;
	private _propsItem;
	private _propsSimpleVault;
	private _props;
	constructor(container: HTMLElement | string, config: ISimpleVaultConfig);
	destructor(): void;
	setProperties(propertyConfig: ISimpleVaultProps): void;
	getProperties(): ISimpleVaultProps;
	show(): void;
	hide(init?: boolean): void;
	isVisible(): boolean;
	disable(): void;
	enable(): void;
	isDisabled(): boolean;
	validate(silent?: boolean): boolean;
	clearValidate(): void;
	clear(): void;
	getValue(): ISimpleVaultValue[];
	selectFile(): void;
	send(params?: IParams): void;
	setValue(value: ISimpleVaultValue[]): void;
	protected _initView(config: ISimpleVaultConfig): void;
	protected _initHandlers(): void;
	private _draw;
}
