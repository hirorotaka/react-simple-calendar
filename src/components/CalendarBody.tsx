import { DateType } from '../types';

type CalendarBodyProps = {
  weeks: DateType[][];
};

const CalendarBody = ({ weeks }: CalendarBodyProps) => {
  // 空の6週目を作成
  const emptyWeek = weeks.length === 5 ? Array(7).fill(null) : [];
  return (
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
      {weeks.length === 5 && (
        <tr>
          {emptyWeek.map((_, index) => (
            <td key={`empty-${index}`} className="px-4 py-3">
              &nbsp;
            </td>
          ))}
        </tr>
      )}
    </tbody>
  );
};

export default CalendarBody;
