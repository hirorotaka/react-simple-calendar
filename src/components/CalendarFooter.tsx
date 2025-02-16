type CalendarFooterProps = {
  goToToday: () => void;
};

const CalendarFooter = ({ goToToday }: CalendarFooterProps) => {
  return (
    <tfoot className="bg-gray-300">
      <tr>
        <td
          colSpan={7}
          onClick={goToToday}
          className="cursor-pointer px-4 py-3 text-center font-bold hover:opacity-50 transition-colors"
        >
          Today
        </td>
      </tr>
    </tfoot>
  );
};

export default CalendarFooter;
