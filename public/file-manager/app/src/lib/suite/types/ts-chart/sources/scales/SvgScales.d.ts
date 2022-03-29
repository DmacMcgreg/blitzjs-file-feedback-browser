import { VNode } from "../../../ts-common/dom";
import { IGridRenderConfig, IScaleConfig } from "../types";
declare type PointInfo = [number, string];
export declare function bottom(
	points: PointInfo[],
	config: IScaleConfig,
	width: number,
	height: number
): VNode;
export declare function bottomGrid(
	points: PointInfo[],
	width: number,
	height: number,
	config: IGridRenderConfig
): VNode;
export declare function top(points: PointInfo[], config: IScaleConfig, width: number, _height: number): VNode;
export declare function topGrid(
	points: PointInfo[],
	_width: number,
	height: number,
	config: IGridRenderConfig
): VNode;
export declare function left(
	points: PointInfo[],
	config: IScaleConfig,
	_width: number,
	height: number
): VNode;
export declare function leftGrid(
	points: PointInfo[],
	width: number,
	height: number,
	config: IGridRenderConfig
): VNode;
export declare function right(
	points: PointInfo[],
	config: IScaleConfig,
	width: number,
	height: number
): VNode;
export declare function rightGrid(
	points: PointInfo[],
	width: number,
	height: number,
	config: IGridRenderConfig
): VNode;
export {};
