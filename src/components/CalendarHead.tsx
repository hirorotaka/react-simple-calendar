import { DAYS_OF_WEEK } from '../constants';

type CalendarHeadProps = {
  prevMonth: () => void;
  nextMonth: () => void;
  yearData: number;
  monthData: number;
};

const CalendarHead = ({
  prevMonth,
  nextMonth,
  yearData,
  monthData,
}: CalendarHeadProps) => {
  return (
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
        {DAYS_OF_WEEK.map((day) => (
          <th
            key={day}
            className={`px-4 py-2
              ${day === '日' ? 'text-red-500' : ''}
              ${day === '土' ? 'text-blue-500' : ''}
              `}
          >
            {day}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default CalendarHead;
