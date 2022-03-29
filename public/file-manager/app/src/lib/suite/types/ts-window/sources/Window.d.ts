import { EventSystem } from "../../ts-common/events";
import { IHandlers } from "../../ts-common/types";
import { Layout } from "../../ts-layout";
import { Toolbar } from "../../ts-toolbar";
import {
	IDirectionConfig,
	IWindowConfig,
	WindowEvents,
	IWindow,
	ISize,
	IPosition,
	IWindowEventHandlersMap,
} from "./types";
export declare class Window implements IWindow {
	config: IWindowConfig;
	events: EventSystem<WindowEvents, IWindowEventHandlersMap>;
	header: Toolbar;
	footer: Toolbar;
	protected _layout: Layout;
	protected _handlers: IHandlers;
	protected _popup: HTMLElement;
	protected _uid: string;
	private _isActive;
	private _blocker;
	private _keyManager;
	private _fullScreen;
	private _oldSizes;
	private _oldPosition;
	constructor(config: IWindowConfig);
	paint(): void;
	isFullScreen(): boolean;
	setFullScreen(): void;
	unsetFullScreen(): void;
	setSize(width: number, height: number): void;
	getSize(): ISize;
	setPosition(left: number, top: number): void;
	getPosition(): IPosition;
	show(left?: number, top?: number): void;
	hide(): void;
	protected _hide(e?: Event): void;
	isVisible(): boolean;
	getWidget(): any;
	getContainer(): HTMLElement;
	attach(name: any, config?: any): void;
	attachHTML(html: string): void;
	getRootView(): any;
	destructor(): void;
	/** @deprecated See a documentation: https://docs.dhtmlx.com/ */
	fullScreen(): void;
	protected _initHandlers(): void;
	protected _initUI(): void;
	protected _drawResizers(): any;
	private _startDrag;
	protected _startResize(resizeConfig: IDirectionConfig): void;
	private _blockScreen;
	protected _notInNode(): boolean;
	protected _getContainerParams(): {
		containerInnerWidth: any;
		containerInnerHeight: any;
		containerXOffset: any;
		containerYOffset: any;
	};
}
