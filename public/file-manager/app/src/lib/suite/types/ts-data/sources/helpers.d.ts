import { IAnyObj } from "../../ts-common/types";
import { DataProxy } from "./dataproxy";
import {
	IFilterCallback,
	IFilterMode,
	IDataCollection,
	IDataItem,
	ITreeCollection,
	DataDriver,
	IDataDriver,
} from "./types";
export declare function isEqualObj(a: any, b: any): boolean;
export declare function naturalCompare(a: any, b: any): any;
export declare function findByConf(item: any, conf: IFilterMode | IFilterCallback): any;
export declare function isDebug(): boolean;
export declare function dhxWarning(msg: string): void;
export declare function dhxError(msg: string): void;
export declare function toProxy(proxy: any): DataProxy;
export declare function toDataDriver(driver: DataDriver | IDataDriver): IDataDriver;
export declare function copyWithoutInner(obj: IAnyObj, forbidden?: IAnyObj): IAnyObj;
export declare function isTreeCollection(
	obj: IDataCollection<any> | ITreeCollection<any> | IDataItem[]
): obj is ITreeCollection<any>;
export declare function hasJsonOrArrayStructure(str: any): boolean;
