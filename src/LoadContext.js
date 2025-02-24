import { createContext, useState } from "react";
export const CheckComponent = createContext();

const CheckComponentProvider = (props) => {
  const [startLoad, setStartLoad] = useState(false);
  
  const checkPage = () => {
    
    setStartLoad(true);
  };
  return (
    <CheckComponent.Provider value={{ startLoad, checkPage }}>
      {props.children}
    </CheckComponent.Provider>
  );
};

export default CheckComponentProvider;