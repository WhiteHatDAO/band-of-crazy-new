import { useContext } from "react";
import HomeContext from "../context/HomeContext";

const useHome = () => useContext(HomeContext);

export default useHome;
