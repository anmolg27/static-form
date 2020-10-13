import {
  SET_START_DATE,
  SET_REPEAT_TYPE,
  SET_YEARLY_SUBTYPE,
  SET_YEARLY_ARG2_MONTH,
  SET_YEARLY_ARG2_MONTHDAY,
  SET_YEARLY_ARG3_SETPOS,
  SET_YEARLY_ARG3_DAY,
  SET_YEARLY_ARG3_MONTH,
  SET_MONTHLY_SUBTYPE,
  SET_MONTHLY_INTERVAL,
  SET_MONTHLY_ARG1_MONTHDAY,
  SET_MONTHLY_ARG2_DAY,
  SET_MONTHLY_ARG2_SETPOS,
  SET_WEEKLY_INTERVAL,
  SET_WEEKLY_DAYS,
  SET_END_SUBTYPE,
  SET_END_AFTER_INTERVAL,
  SET_END_ON_DATE,
} from "../types";

const initialState = {
  dateStart: new Date(
    Date.UTC(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    )
  ),
  repeat: {
    yearly: {
      isYearly: true,
      arg2: {
        isArg2: true,
        byMonth: 1,
        byMonthDay: 1,
      },
      arg3: {
        isArg3: false,
        bySetPos: 1,
        byDay: "MO",
        byMonth: 1,
      },
    },
    monthly: {
      isMonthly: false,
      interval: 1,
      arg1: {
        isArg1: true,
        byMonthDay: 1,
      },
      arg2: {
        isArg2: false,
        bySetPos: 1,
        byDay: "MO",
      },
    },
    weekly: {
      isWeekly: false,
      interval: 1,
      byDay: [],
    },
  },
  end: {
    never: {
      isNever: true,
    },
    after: {
      isAfter: false,
      count: 1,
    },
    onDate: {
      isOnDate: false,
      until: new Date(
        Date.UTC(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate()
        )
      ),
    },
  },
};

let temp;
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_START_DATE:
      temp = action.payload.split("-");
      return {
        ...state,
        dateStart: new Date(
          Date.UTC(parseInt(temp[0]), parseInt(temp[1]) - 1, parseInt(temp[2]))
        ),
      };
    case SET_REPEAT_TYPE:
      temp = state;
      if (action.payload === "Yearly") {
        temp.repeat.yearly.isYearly = true;
        temp.repeat.monthly.isMonthly = false;
        temp.repeat.weekly.isWeekly = false;
      }
      if (action.payload === "Monthly") {
        temp.repeat.yearly.isYearly = false;
        temp.repeat.monthly.isMonthly = true;
        temp.repeat.weekly.isWeekly = false;
      }
      if (action.payload === "Weekly") {
        temp.repeat.yearly.isYearly = false;
        temp.repeat.monthly.isMonthly = false;
        temp.repeat.weekly.isWeekly = true;
      }
      return temp;
    case SET_YEARLY_SUBTYPE:
      temp = state;
      if (action.payload === "month-day") {
        temp.repeat.yearly.arg2.isArg2 = true;
        temp.repeat.yearly.arg3.isArg3 = false;
      } else if (action.payload === "week-day") {
        temp.repeat.yearly.arg2.isArg2 = false;
        temp.repeat.yearly.arg3.isArg3 = true;
      }
      return temp;
    case SET_YEARLY_ARG2_MONTH:
      temp = state;
      temp.repeat.yearly.arg2.byMonth = action.payload;
      return temp;
    case SET_YEARLY_ARG2_MONTHDAY:
      temp = state;
      temp.repeat.yearly.arg2.byMonthDay = action.payload;
      return temp;
    case SET_YEARLY_ARG3_SETPOS:
      temp = state;

      if (action.payload !== 5) {
        temp.repeat.yearly.arg3.bySetPos = action.payload;
      } else temp.repeat.yearly.arg3.bySetPos = -1;
      return temp;
    case SET_YEARLY_ARG3_DAY:
      temp = state;
      temp.repeat.yearly.arg3.byDay = action.payload
        .substring(0, 2)
        .toUpperCase();
      return temp;
    case SET_YEARLY_ARG3_MONTH:
      temp = state;
      temp.repeat.yearly.arg3.byMonth = action.payload;
      return temp;
    case SET_MONTHLY_INTERVAL:
      temp = state;

      temp.repeat.monthly.interval = parseInt(action.payload);
      return temp;
    case SET_MONTHLY_SUBTYPE:
      temp = state;
      if (action.payload === "month-day") {
        temp.repeat.monthly.arg1.isArg1 = true;
        temp.repeat.monthly.arg2.isArg2 = false;
      } else if (action.payload === "week-day") {
        temp.repeat.monthly.arg1.isArg1 = false;
        temp.repeat.monthly.arg2.isArg2 = true;
      }
      return temp;
    case SET_MONTHLY_ARG1_MONTHDAY:
      temp = state;
      temp.repeat.monthly.arg1.byMonthDay = action.payload;
      return temp;
    case SET_MONTHLY_ARG2_SETPOS:
      temp = state;
      if (action.payload !== 5) {
        temp.repeat.monthly.arg2.bySetPos = action.payload;
      } else temp.repeat.monthly.arg2.bySetPos = -1;
      return temp;
    case SET_MONTHLY_ARG2_DAY:
      temp = state;
      temp.repeat.monthly.arg2.byDay = action.payload
        .substring(0, 2)
        .toUpperCase();
      return temp;
    case SET_WEEKLY_INTERVAL:
      temp = state;
      temp.repeat.weekly.interval = parseInt(action.payload);
      return temp;
    case SET_WEEKLY_DAYS:
      temp = state;
      temp.repeat.weekly.byDay = action.payload.map((wk) =>
        wk.substring(0, 2).toUpperCase()
      );
      return temp;
    case SET_END_SUBTYPE:
      temp = state;
      if (action.payload === "Never") {
        temp.end.never.isNever = true;
        temp.end.after.isAfter = false;
        temp.end.onDate.isOnDate = false;
      }
      if (action.payload === "After") {
        temp.end.never.isNever = false;
        temp.end.after.isAfter = true;
        temp.end.onDate.isOnDate = false;
      }
      if (action.payload === "On Date") {
        temp.end.never.isNever = false;
        temp.end.after.isAfter = false;
        temp.end.onDate.isOnDate = true;
      }
      return temp;
    case SET_END_AFTER_INTERVAL:
      temp = state;
      temp.end.after.count = parseInt(action.payload);
      return temp;
    case SET_END_ON_DATE:
      temp = state;
      let tempDate = action.payload.split("-");
      temp.end.onDate.until = new Date(
        Date.UTC(
          parseInt(tempDate[0]),
          parseInt(tempDate[1]) - 1,
          parseInt(tempDate[2])
        )
      );
      return temp;

    default:
      return state;
  }
}
