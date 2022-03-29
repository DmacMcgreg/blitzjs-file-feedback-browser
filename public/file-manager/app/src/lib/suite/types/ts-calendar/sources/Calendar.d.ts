import { IEventSystem } from "../../ts-common/events";
import { View } from "../../ts-common/view";
import { CalendarEvents, ICalendar, ICalendarConfig, ViewMode, ICalendarHandlersMap } from "./types";
export declare class Calendar extends View implements ICalendar {
	events: IEventSystem<CalendarEvents, ICalendarHandlersMap>;
	config: ICalendarConfig;
	private _selected;
	private _currentDate;
	private _currentViewMode;
	private _isSelectedInCurrentRange;
	private _handlers;
	private _timepicker;
	private _time;
	private _linkedCalendar;
	constructor(container: HTMLElement | string, config?: ICalendarConfig);
	setValue(value: Date | Date[] | string | string[]): boolean;
	getValue<T extends boolean = false>(asDateObject?: T): Date | string;
	getValue<T extends boolean = true>(asDateObject?: T): Date[] | string[];
	getCurrentMode(): ViewMode;
	showDate(date?: Date, mode?: ViewMode): void;
	destructor(): void;
	clear(): void;
	link(targetCalendar: Calendar): void;
	private _unlink;
	private _setSelected;
	private _getSelected;
	private _draw;
	private _initHandlers;
	private _getData;
	private _drawCalendar;
	private _drawMonthSelector;
	private _drawYearSelector;
	private _drawHeader;
	private _drawTimepicker;
	private _selectDate;
	private _moveBrowseFocus;
}
