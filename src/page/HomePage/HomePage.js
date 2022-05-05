import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { Navigate, useSearchParams } from "react-router-dom"
import {TitleStyled} from "./HomePage.styled";
import SearchFormUser from "../../components/SearchFormUsers";

export default function HomePage () {
const [searchParams, setSearchParams] = useSearchParams();
const query = searchParams.get("query");

return(
  <>
  <FaRegArrowAltCircleLeft/>
  <TitleStyled> Search for users on github </TitleStyled>
  <p>Please enter any user login on the github and you will receive up-to-date information about the user's repositories</p>
  <SearchFormUser searchParam={setSearchParams}/>
  {query && <Navigate to={`/${query}`}/>}
  </>
)}
