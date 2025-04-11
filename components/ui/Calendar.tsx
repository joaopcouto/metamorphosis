import dayjs from 'dayjs';
import { Dispatch, SetStateAction } from 'react';
import DateTimePicker, { DateType } from 'react-native-ui-datepicker';

export default function Calendar({
  selected,
  setSelected,
}: {
  selected: DateType | null;
  setSelected: Dispatch<SetStateAction<DateType | null>>;
}) {
  let today = new Date();

  return (
    <DateTimePicker
      style={{ height: 200, width: 200 }}
      mode="single"
      date={selected ?? today}
      onChange={({ date }) => setSelected(date)}
    />
  );
}
