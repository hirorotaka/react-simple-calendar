import CalendarHead from './components/CalendarHead';
import CalendarBody from './components/CalendarBody';
import CalendarFooter from './components/CalendarFooter';
import { useCalendar } from './hooks/useCalendar';

function App() {
  const { yearData, monthData, prevMonth, nextMonth, goToToday, weeks } =
    useCalendar();

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <table className="border-collapse border-solid border-gray-200 border mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <CalendarHead
          prevMonth={prevMonth}
          nextMonth={nextMonth}
          yearData={yearData}
          monthData={monthData}
        />
        <CalendarBody weeks={weeks} />

        <CalendarFooter goToToday={goToToday} />
      </table>
    </div>
  );
}

export default App;
