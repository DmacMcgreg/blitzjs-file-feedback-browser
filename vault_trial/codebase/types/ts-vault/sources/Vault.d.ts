import { View } from "../../ts-common/view"
import { DataCollection } from "../../ts-data"
import { Toolbar } from "../../ts-toolbar"
import { IFileWrapper, IUploader, IVault, IVaultConfig, IVaultEventSystem } from "./types"
import { DataView } from "../../ts-dataview"
import { List } from "../../ts-list"
export declare class Vault extends View implements IVault {
  config: IVaultConfig
  data: DataCollection<IFileWrapper>
  events: IVaultEventSystem
  uploader: IUploader
  toolbar: Toolbar
  list: List
  grid: DataView
  private _layout
  private _emptyField
  private _activeView
  private _readStack
  private _canDrop
  private readonly _progressBar
  constructor(container: HTMLElement | string, config?: IVaultConfig)
  destructor(): void
  getRootView(): any
  paint(): void
  private _initUI
  private _initList
  private _initGrid
  private _initToolbar
  private _initEmpty
  private _changeUI
  private _initEvents
  private _getDragEvents
  private _hideAdditionalButtons
  private _showAdditionalButtons
}
