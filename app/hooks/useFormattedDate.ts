import { format } from "date-fns";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export const useFormattedDate = (
  date: Date | string,
  dateFormat: string = "PP"
) => {
  const { t } = useTranslation();
  return useMemo(
    () => format(new Date(date), t(dateFormat)),
    [date, dateFormat, t]
  );
};
