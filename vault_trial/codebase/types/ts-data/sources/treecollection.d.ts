import { IEventSystem } from "../../ts-common/events"
import { DataCollection } from "./datacollection"
import {
  DataCallback,
  DataEvents,
  IDataCollection,
  IDataItem,
  ITreeCollection,
  IFilterCallback,
  IFilterMode,
  IFilterComplexMode,
  ITreeFilterConfig,
  DataDriver,
  ISortMode,
  IDataDriver,
} from "./types"
import { Id } from "../../ts-common/types"
export declare class TreeCollection<T extends IDataItem = IDataItem>
  extends DataCollection<T>
  implements ITreeCollection<T>
{
  protected _childs: {
    [id: string]: T[]
  }
  protected _root: Id
  protected _filters: {
    filters: IFilterComplexMode | IFilterCallback
    config: ITreeFilterConfig
  }
  private _initChilds
  constructor(config?: any, events?: IEventSystem<DataEvents>)
  add(newItem: IDataItem, index?: number, parent?: Id): Id
  add(newItem: IDataItem[], index?: number, parent?: Id): Id[]
  getRoot(): Id
  getParent(id: Id, asObj?: boolean): Id
  getItems(id: Id): T[]
  getLength(id?: Id): number
  removeAll(id?: Id): void
  getIndex(id: Id): number
  sort(rule?: ISortMode): void
  filter(
    rule?: IFilterMode | IFilterComplexMode | IFilterCallback,
    config?: ITreeFilterConfig
  ): void
  restoreOrder(): void
  copy(id: Id, index: number, target?: IDataCollection | ITreeCollection, targetId?: Id): Id
  copy(id: Id[], index: number, target?: IDataCollection | ITreeCollection, targetId?: Id): Id[]
  move(id: Id, index: number, target?: ITreeCollection | IDataCollection, targetId?: Id): Id
  move(id: Id[], index: number, target?: ITreeCollection | IDataCollection, targetId?: Id): Id[]
  forEach(callback: DataCallback<any>, parent?: Id, level?: number): void
  eachChild(
    id: Id,
    callback: DataCallback<T>,
    direct?: boolean,
    checkItem?: (item: IDataItem) => boolean
  ): void
  getNearId(id: Id): Id
  loadItems(id: Id, driver?: IDataDriver | DataDriver): void
  refreshItems(id: Id, driver?: IDataDriver | DataDriver): void
  eachParent(id: Id, callback: DataCallback<T>, self?: boolean): void
  haveItems(id: Id): boolean
  canCopy(id: Id, target: Id): boolean
  serialize(driver?: DataDriver, checkItem?: (item: any) => any): any
  getId(index: number, parent?: Id): Id
  map(callback: DataCallback<T>, parent?: Id, direct?: boolean): any[]
  getRawData(from: number, to: number, order?: T[], mode?: number, parent?: Id): T[]
  protected flatten(input: T[]): T[]
  protected _add(newItem: IDataItem, index?: number, parent?: Id, key?: number): Id
  protected _copy(
    id: Id,
    index: number,
    target?: IDataCollection | ITreeCollection,
    targetId?: Id,
    key?: number
  ): Id
  protected _move(
    id: Id,
    index: number,
    target?: ITreeCollection | IDataCollection,
    targetId?: Id,
    key?: number
  ): Id
  protected _reset(id?: Id): void
  protected _removeCore(id: any): void
  protected _addToOrder(_order: any, obj: any, index: number): void
  protected _parse_data(data: any, parent?: string | number): void
  private _fastDeleteChilds
  private _recursiveFilter
  private _serialize
}
