import { IEventSystem } from "../../ts-common/events"
import { View } from "../../ts-common/view"
import { DataCollection, DataEvents, IDataEventsHandlersMap } from "../../ts-data"
import { Layout } from "../../ts-layout"
import { List } from "../../ts-list"
import { Popup } from "../../ts-popup"
import { Id, IHandlers } from "../../ts-common/types"
import {
  ComboboxEvents,
  ICombobox,
  IComboboxConfig,
  IComboboxEventHandlersMap,
  State,
} from "./types"
export declare class Combobox extends View implements ICombobox {
  data: DataCollection
  config: IComboboxConfig
  events: IEventSystem<
    DataEvents | ComboboxEvents,
    IComboboxEventHandlersMap | IDataEventsHandlersMap
  >
  list: List
  popup: Popup
  protected _helper: Popup
  private _keyListener
  protected _layout: Layout
  private _isPopupConfiqureted
  private _state
  protected _handlers: IHandlers
  constructor(element: HTMLElement | string, config: IComboboxConfig)
  focus(): void | boolean
  blur(): void | boolean
  enable(): void
  disable(): void
  isDisabled(): boolean
  clear(): void | boolean
  getValue<T extends boolean = false>(asArray?: T): T extends true ? string[] : string
  setValue(ids: Id[] | Id): void | boolean
  destructor(): void
  /** @deprecated See a documentation: https://docs.dhtmlx.com/ */
  setState(state: State): void
  private _setValue
  protected _createLayout(): void
  private _initHandlers
  private _initEvents
  private _showOptions
  private _configurePopup
  private _hideOptions
  private _filter
  private _findBest
  private _exsistId
  private _draw
  private _drawSelectedItems
  private _drawImageOrIcon
  private _getItemText
  private _updateSelectedItem
  private _changePopupPosition
  private _updatePopup
}
