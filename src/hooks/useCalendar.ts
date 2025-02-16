import { useMemo, useState } from 'react';
import { DateType } from '../types';

const today = new Date();
const initialYear = today.getFullYear();
const initialMonth = today.getMonth();

export const useCalendar = () => {
  const [yearData, setYearData] = useState(initialYear);
  const [monthData, setMonthData] = useState(initialMonth);

  // 前月の日付を取得（カレンダーの上部に表示される前月の日付）
  const getPreviousMonthDates = (): DateType[] => {
    const dates: DateType[] = [];
    const lastDayOfPrevMonth = new Date(yearData, monthData, 0).getDate(); // 前月の最終日
    const firstWeekdayOfMonth = new Date(yearData, monthData, 1).getDay(); // 当月1日の曜日（0-6）

    // 前月の日付を必要な分だけ追加
    for (let i = 0; i < firstWeekdayOfMonth; i++) {
      dates.unshift({
        date: lastDayOfPrevMonth - i,
        isToday: false,
        isDisabled: true,
      });
    }
    return dates;
  };

  // 日付のボディを取得
  const getCalendarBody = (): DateType[] => {
    const dates: DateType[] = [];
    const lastDate = new Date(yearData, monthData + 1, 0).getDate();

    for (let date = 1; date <= lastDate; date++) {
      dates.push({
        date: date,
        isToday:
          yearData === today.getFullYear() &&
          monthData === today.getMonth() &&
          date === today.getDate(),
        isDisabled: false,
      });
    }

    return dates;
  };

  // 日付のフッターを取得
  const getCalendarTail = (): DateType[] => {
    const dates: DateType[] = [];
    const lastDay = new Date(yearData, monthData + 1, 0).getDay();

    for (let i = 1; i < 7 - lastDay; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: true,
      });
    }
    return dates;
  };

  // テーブルを作成
  const weeks = useMemo(() => {
    const dates = [
      ...getPreviousMonthDates(),
      ...getCalendarBody(),
      ...getCalendarTail(),
    ];

    const weeks = [];
    const weeksCount = dates.length / 7;

    // splice ではなく slice を使用
    for (let i = 0; i < weeksCount; i++) {
      weeks.push(dates.slice(i * 7, (i + 1) * 7));
    }
    return weeks;
  }, [yearData, monthData]);

  // 前月へ移動
  const prevMonth = () => {
    if (monthData === 0) {
      //1月の場合
      setYearData(yearData - 1); // 前年
      setMonthData(11); // 12月
    } else {
      setMonthData(monthData - 1);
    }
  };

  // 次月へ移動
  const nextMonth = () => {
    // 12月の場合
    if (monthData === 11) {
      setYearData(yearData + 1); // 次年
      setMonthData(0); // 1月
    } else {
      setMonthData(monthData + 1);
    }
  };

  // 今日へ移動
  const goToToday = () => {
    setYearData(initialYear);
    setMonthData(initialMonth);
  };
  return {
    yearData,
    monthData,
    weeks,
    prevMonth,
    nextMonth,
    goToToday,
  };
};
