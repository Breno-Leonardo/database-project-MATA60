import {createContext, useContext, useEffect, useState} from "react";
import {UserTokenType} from "../types/UserTokenType";

interface GlobalData {
  user?: UserTokenType;
  currentRequest?: any;
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

  const setCurrentRequestStorageContext = (request:any | undefined) => {
    if (request != undefined) {
      setGlobalData({
        ...globalData,
        currentRequest: request,
      });
    } else {
      setGlobalData({
        ...globalData,
        currentRequest: undefined,
      });
    }
  };
  return {
    globalData,
    user: globalData?.user,
    setUserStorageContext,
    currentRequest: globalData?.currentRequest,
    setCurrentRequestStorageContext,
  };
};
