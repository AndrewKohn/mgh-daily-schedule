import { createContext, useEffect, useState } from 'react';

interface Props {
  children?: React.ReactNode;
}

const StaffShiftContext = createContext({
  isClearViewHouse: true,
  isDayShift: true,
  onHouseChange: () => {},
  onStaffShiftChange: () => {},
});

export const StaffShiftContextProvider: React.FC<Props> = ({
  children,
}): JSX.Element => {
  const [isClearviewHouse, setIsClearviewHouse] = useState<boolean>(true);
  const [isDayShift, setIsDayShift] = useState<boolean>(true);

  useEffect(() => {
    console.log('CV House: ', isClearviewHouse);
    console.log('Shift: ', isDayShift);
  }, [isClearviewHouse, isDayShift]);

  return (
    <StaffShiftContext.Provider
      value={{
        isClearViewHouse: isClearviewHouse,
        isDayShift: isDayShift,
        onHouseChange: () => setIsClearviewHouse(!isClearviewHouse),
        onStaffShiftChange: () => setIsDayShift(!isDayShift),
      }}
    >
      {children}
    </StaffShiftContext.Provider>
  );
};

export default StaffShiftContext;
