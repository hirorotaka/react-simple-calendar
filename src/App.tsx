import { useState } from 'react';

type DateType = {
  date: number;
  isToday: boolean;
  isDisabled: boolean;
};

const today = new Date();
const initialYear = today.getFullYear();
const initialMonth = today.getMonth();

function App() {
  const [yearData, setYearData] = useState(initialYear);
  const [monthData, setMonthData] = useState(initialMonth);

  // 日付のヘッダーを取得
  const getCalendarHead = (): DateType[] => {
    const dates: DateType[] = [];
    const d = new Date(yearData, monthData, 0).getDate();
    const n = new Date(yearData, monthData, 1).getDay();

    for (let i = 0; i < n; i++) {
      dates.unshift({
        date: d - i,
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
  const renderWeeks = (): DateType[][] => {
    const dates = [
      ...getCalendarHead(),
      ...getCalendarBody(),
      ...getCalendarTail(),
    ];

    const weeks = [];
    const weeksCount = dates.length / 7;

    for (let i = 0; i < weeksCount; i++) {
      weeks.push(dates.splice(0, 7));
    }
    return weeks;
  };

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

  const weeks = renderWeeks();

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <table className="border-collapse border-solid border-gray-200 border mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr className="border-b border-gray-200">
            <th
              onClick={prevMonth}
              className="cursor-pointer px-4 py-3 hover:bg-gray-100 transition-colors"
            >
              &laquo;
            </th>
            <th colSpan={5} className="px-4 py-3 font-bold text-lg">
              {yearData}年{monthData + 1}月
            </th>
            <th
              onClick={nextMonth}
              className="cursor-pointer px-4 py-3 hover:bg-gray-100 transition-colors"
            >
              &raquo;
            </th>
          </tr>
          <tr className="border-b border-gray-200">
            <th className="px-4 py-2 text-red-500">日</th>
            <th className="px-4 py-2">月</th>
            <th className="px-4 py-2">火</th>
            <th className="px-4 py-2">水</th>
            <th className="px-4 py-2">木</th>
            <th className="px-4 py-2">金</th>
            <th className="px-4 py-2 text-blue-500">土</th>
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, weekIndex) => (
            <tr key={`week-${weekIndex}-${week[0].date}`}>
              {week.map((date, dateIndex) => (
                <td
                  key={`date-${weekIndex}-${dateIndex}-${date.date}`}
                  className={`
                    px-4 py-3 text-center
                    ${dateIndex === 0 ? 'text-red-500' : ''}
                    ${dateIndex === 6 ? 'text-blue-500' : ''}
                    ${date.isDisabled ? 'opacity-30' : ''}
                    ${date.isToday ? 'bg-gray-200 rounded-full font-bold' : ''}
                    hover:bg-gray-50 transition-colors
                  `}
                >
                  {date.date}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-gray-200">
          <tr>
            <td
              colSpan={7}
              onClick={goToToday}
              className="cursor-pointer px-4 py-3 text-center font-bold hover:bg-gray-100 transition-colors"
            >
              Today
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default App;
