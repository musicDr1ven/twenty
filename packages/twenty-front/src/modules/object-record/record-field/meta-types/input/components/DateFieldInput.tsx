import { Nullable } from 'twenty-ui';

import { useDateField } from '@/object-record/record-field/meta-types/hooks/useDateField';
import { DateInput } from '@/ui/field/input/components/DateInput';
import { isDefined } from '~/utils/isDefined';

import { useRef, useState } from 'react';
import { usePersistField } from '../../../hooks/usePersistField';

type FieldInputEvent = (persist: () => void) => void;

type DateFieldInputProps = {
  onClickOutside?: FieldInputEvent;
  onEnter?: FieldInputEvent;
  onEscape?: FieldInputEvent;
  onClear?: FieldInputEvent;
  onSubmit?: FieldInputEvent;
};

export const DateFieldInput = ({
  onEnter,
  onEscape,
  onClickOutside,
  onClear,
  onSubmit,
}: DateFieldInputProps) => {
  const { fieldValue, setDraftValue } = useDateField();

  const persistField = usePersistField();

  const persistDate = (newDate: Nullable<Date>) => {
    if (!isDefined(newDate)) {
      persistField(null);
    } else {
      const newDateISO = newDate?.toISOString();

      persistField(newDateISO);
    }
  };

  const handleEnter = (newDate: Nullable<Date>) => {
    onEnter?.(() => persistDate(newDate));
  };

  const handleSubmit = (newDate: Nullable<Date>) => {
    onSubmit?.(() => persistDate(newDate));
  };

  const handleEscape = (newDate: Nullable<Date>) => {
    onEscape?.(() => persistDate(newDate));
  };

  const handleClickOutside = (
    _event: MouseEvent | TouchEvent,
    newDate: Nullable<Date>,
  ) => {
    onClickOutside?.(() => persistDate(newDate));
  };

  const handleChange = (newDate: Nullable<Date>) => {
    setDraftValue(newDate?.toDateString() ?? '');
  };

  const handleClear = () => {
    onClear?.(() => persistDate(null));
  };

  const dateValue = fieldValue ? new Date(fieldValue) : null;

  const wrapperRef = useRef<HTMLDivElement>(null);

  const [temporaryValue, setTemporaryValue] =
    useState<Nullable<Date>>(dateValue);

  return (
    <div ref={wrapperRef}>
      <DateInput
        onClickOutside={handleClickOutside}
        onEnter={handleEnter}
        onEscape={handleEscape}
        clearable
        onChange={handleChange}
        onClear={handleClear}
        onSubmit={handleSubmit}
        wrapperRef={wrapperRef}
        temporaryValue={temporaryValue}
        setTemporaryValue={setTemporaryValue}
      />
    </div>
  );
};
