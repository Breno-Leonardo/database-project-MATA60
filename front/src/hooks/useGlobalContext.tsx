import {createContext, useContext, useEffect, useState} from "react";
import {UserTokenType} from "../types/UserTokenType";
import {VacationRequestReturn} from "../types/ReturnVacationRequestType";

interface GlobalData {
  user?: UserTokenType;
  currentVacationRequest?: VacationRequestReturn;
}
interface GlobalContextProps {
  globalData: GlobalData;
  setGlobalData: (globalData: GlobalData) => void;
}

interface GlobalProviderProps {
  children: React.ReactNode;
}
const GlobalContext = createContext<GlobalContextProps>({} as GlobalContextProps);

export const GlobalProvider = ({children}: GlobalProviderProps) => {
  const [globalData, setGlobalData] = useState<GlobalData>({});

  return <GlobalContext.Provider value={{globalData, setGlobalData}}>{children}</GlobalContext.Provider>;
};

export const useGlobalContext = () => {
  const {globalData, setGlobalData} = useContext(GlobalContext);

  const setUserStorageContext = (user: UserTokenType | undefined) => {
    if (user != undefined) {
      setGlobalData({
        ...globalData,
        user: user,
      });
    } else {
      setGlobalData({
        ...globalData,
        user: undefined,
      });
    }
  };

  const setCurrentVacationRequestStorageContext = (vacationRequest: VacationRequestReturn | undefined) => {
    if (vacationRequest != undefined) {
      setGlobalData({
        ...globalData,
        currentVacationRequest: vacationRequest,
      });
    } else {
      setGlobalData({
        ...globalData,
        currentVacationRequest: undefined,
      });
    }
  };
  return {
    globalData,
    user: globalData?.user,
    setUserStorageContext,
    currentVacationRequest: globalData?.currentVacationRequest,
    setCurrentVacationRequestStorageContext,
  };
};
