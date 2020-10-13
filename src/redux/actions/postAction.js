import { RRule } from "rrule";
import axios from "axios";

export const postData = (url) => (dispatch, getState) => {
  const inputsData = getState().inputs;
  const repeat = getState().inputs.repeat;
  const isYearly = repeat.yearly.isYearly;
  const isMonthly = repeat.monthly.isMonthly;
  const isWeekly = repeat.weekly.isWeekly;
  const isYearlyArg2 = repeat.yearly.arg2.isArg2;
  const isYearlyArg3 = repeat.yearly.arg3.isArg3;
  const isMonthlyArg1 = repeat.monthly.arg1.isArg1;
  const isMonthlyArg2 = repeat.monthly.arg2.isArg2;
  const end = getState().inputs.end;
  const isNever = end.never.isNever;
  const isAfter = end.after.isAfter;
  const isOnDate = end.onDate.isOnDate;
  let rrule;
  if (isYearly && isYearlyArg2 && isNever) {
    rrule = new RRule({
      freq: RRule.YEARLY,
      dtstart: inputsData.dateStart,
      bymonth: [repeat.yearly.arg2.byMonth],
      bymonthday: [repeat.yearly.arg2.byMonthDay],
    });
  } else if (isYearly && isYearlyArg3 && isNever) {
    rrule = new RRule({
      freq: RRule.YEARLY,
      dtstart: inputsData.dateStart,
      bysetpos: [repeat.yearly.arg3.bySetPos],
      byweekday: RRule[repeat.yearly.arg3.byDay],
      bymonth: [repeat.yearly.arg3.byMonth],
    });
  } else if (isYearly && isYearlyArg2 && isAfter) {
    rrule = new RRule({
      freq: RRule.YEARLY,
      dtstart: inputsData.dateStart,
      bymonth: [repeat.yearly.arg2.byMonth],
      bymonthday: [repeat.yearly.arg2.byMonthDay],
      count: end.after.count,
    });
  } else if (isYearly && isYearlyArg3 && isAfter) {
    rrule = new RRule({
      freq: RRule.YEARLY,
      dtstart: inputsData.dateStart,
      bysetpos: [repeat.yearly.arg3.bySetPos],
      byweekday: RRule[repeat.yearly.arg3.byDay],
      bymonth: [repeat.yearly.arg3.byMonth],
      count: end.after.count,
    });
  } else if (isYearly && isYearlyArg2 && isOnDate) {
    rrule = new RRule({
      freq: RRule.YEARLY,
      dtstart: inputsData.dateStart,
      bymonth: [repeat.yearly.arg2.byMonth],
      bymonthday: [repeat.yearly.arg2.byMonthDay],
      until: end.onDate.until,
    });
  } else if (isYearly && isYearlyArg3 && isOnDate) {
    rrule = new RRule({
      freq: RRule.YEARLY,
      dtstart: inputsData.dateStart,
      bysetpos: [repeat.yearly.arg3.bySetPos],
      byweekday: RRule[repeat.yearly.arg3.byDay],
      bymonth: [repeat.yearly.arg3.byMonth],
      until: end.onDate.until,
    });
  } else if (isMonthly && isMonthlyArg1 && isNever) {
    rrule = new RRule({
      freq: RRule.MONTHLY,
      dtstart: inputsData.dateStart,
      interval: repeat.monthly.interval,
      bymonthday: [repeat.monthly.arg1.byMonthDay],
    });
  } else if (isMonthly && isMonthlyArg2 && isNever) {
    rrule = new RRule({
      freq: RRule.MONTHLY,
      dtstart: inputsData.dateStart,
      interval: repeat.monthly.interval,
      bysetpos: [repeat.monthly.arg2.bySetPos],
      byweekday: RRule[repeat.monthly.arg2.byDay],
    });
  } else if (isMonthly && isMonthlyArg1 && isAfter) {
    rrule = new RRule({
      freq: RRule.MONTHLY,
      dtstart: inputsData.dateStart,
      interval: repeat.monthly.interval,
      bymonthday: [repeat.monthly.arg1.byMonthDay],
      count: end.after.count,
    });
  } else if (isMonthly && isMonthlyArg2 && isAfter) {
    rrule = new RRule({
      freq: RRule.MONTHLY,
      dtstart: inputsData.dateStart,
      interval: repeat.monthly.interval,
      bysetpos: [repeat.monthly.arg2.bySetPos],
      byweekday: RRule[repeat.monthly.arg2.byDay],
      count: end.after.count,
    });
  } else if (isMonthly && isMonthlyArg1 && isOnDate) {
    rrule = new RRule({
      freq: RRule.MONTHLY,
      dtstart: inputsData.dateStart,
      interval: repeat.monthly.interval,
      bymonthday: [repeat.monthly.arg1.byMonthDay],
      until: end.onDate.until,
    });
  } else if (isMonthly && isMonthlyArg2 && isOnDate) {
    rrule = new RRule({
      freq: RRule.MONTHLY,
      dtstart: inputsData.dateStart,
      interval: repeat.monthly.interval,
      bysetpos: [repeat.monthly.arg2.bySetPos],
      byweekday: RRule[repeat.monthly.arg2.byDay],
      until: end.onDate.until,
    });
  } else if (isWeekly && isNever) {
    rrule = new RRule({
      freq: RRule.WEEKLY,
      dtstart: inputsData.dateStart,
      interval: repeat.weekly.interval,
      byweekday: repeat.weekly.byDay.map((wkDay) => RRule[wkDay]),
    });
  } else if (isWeekly && isAfter) {
    rrule = new RRule({
      freq: RRule.WEEKLY,
      dtstart: inputsData.dateStart,
      interval: repeat.weekly.interval,
      byweekday: repeat.weekly.byDay.map((wkDay) => RRule[wkDay]),
      count: end.after.count,
    });
  } else if (isWeekly && isOnDate) {
    rrule = new RRule({
      freq: RRule.WEEKLY,
      dtstart: inputsData.dateStart,
      interval: repeat.weekly.interval,
      byweekday: repeat.weekly.byDay.map((wkDay) => RRule[wkDay]),
      until: end.onDate.until,
    });
  }
  //   console.log(rrule.toString());

  document.querySelector("#rrule").innerHTML = rrule.toString();
  if (
    !url.startsWith("https://postb.in") ||
    url.startsWith("https://postb.in/b")
  )
    return alert("Failed! please check if you have entered valid url");
  axios
    .post(url, rrule.toString())
    .then((res) => alert("success!"))
    .catch((err) => {
      if (err.message === "Network Error") {
        alert("success!");
      } else {
        alert(
          "Failed! please try again later or use another newly generated postbin url"
        );
      }
    });
};
