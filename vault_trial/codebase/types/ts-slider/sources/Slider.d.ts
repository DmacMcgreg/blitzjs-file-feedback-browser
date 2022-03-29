import { IEventSystem } from "../../ts-common/events"
import { View } from "../../ts-common/view"
import { Popup } from "../../ts-popup"
import { ISlider, SliderEvents, ISliderConfig, ISliderEventHandlersMap } from "./types"
export declare class Slider extends View implements ISlider {
  config: ISliderConfig
  events: IEventSystem<SliderEvents, ISliderEventHandlersMap>
  protected _helper: Popup
  private _offsets
  private _currentPosition
  private _extraCurrentPosition
  private _length
  private _axis
  private _isExtraActive
  private _disabled
  private _isMouseMoving
  private _keyManager
  private _handlers
  private _possibleRange
  private _findNewDirection
  private _mouseIn
  private _focusIn
  private _tooltip
  private _activeTooltip
  constructor(container: HTMLElement | string, config: ISliderConfig)
  disable(): void
  enable(): void
  isDisabled(): boolean
  focus(extra?: boolean): void
  blur(): void
  getValue(): number[]
  setValue(value: string | number | number[]): void
  destructor(): void
  private _calcSliderPosition
  private _initHotkeys
  private _move
  private _initStartPosition
  private _getValue
  private _setValue
  private _initHandlers
  private _getBegining
  private _inSide
  private _updatePosition
  private _getRunnerStyle
  private _isInverse
  private _getRunnerCss
  private _draw
  private _drawSlider
  private _getDetector
  private _drawTooltip
  private _getTicks
  private _drawTicks
  private _isNullable
  private _setTooltip
}
