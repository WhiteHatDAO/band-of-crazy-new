import { useContext } from "react";
import ClubContext from "../context/ClubContext";

const useClub = () => useContext(ClubContext);

export default useClub;
