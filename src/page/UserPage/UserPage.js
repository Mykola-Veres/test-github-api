import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import {TextStyled, ListStyled, LinkStyled, TitleStyled, SecondTitleStyled} from "./UserPage.styled";
import UserLanguage from "../../components/UserLanguage"
import * as GitHubAPI from "../../services/GitHubAPI";

export default function UserPage () {
  const [userData, setUserData] = useState(null)
  const {username} = useParams();
  const [repos, setRepos] = useState(null);

  useEffect (()=> {
    if (!username) {return}
    async function fetchUserQ () {
      try {
        const fetchUser = await GitHubAPI.fetchUserData(username)
        setUserData(fetchUser);
      }
      catch(error) {toast.error("This didn't work. Thumping went wrong! Try again!!!")}
      try {
        const fetchUserRepos = await GitHubAPI.fetchUserRepos(username)
        setRepos(fetchUserRepos)
      }
      catch(error) {toast.error("This didn't work. Thumping went wrong! Try again!!!")}
      }
      fetchUserQ ()
  },[username])

  function filterRecentlyRepos () {
    if(!repos) {return}
    const sortRecentlyRepos = repos.sort((a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at)).slice(0,5)
    return sortRecentlyRepos
  }

return(
  <article>
    <Link to={`/`} ><FaRegArrowAltCircleLeft/> go to Banks </Link>
    {userData && repos &&
    <>
    <TitleStyled>{userData.name}</TitleStyled>
    <LinkStyled href= {`${userData.html_url}`}> Link to User Page on GitHub </LinkStyled>
    <TextStyled>Login: {userData.login}</TextStyled>
    <TextStyled>Public repositories: {userData.public_repos} </TextStyled>
    <TextStyled>Since when on github: {userData.created_at}</TextStyled>
    <UserLanguage username={username} repos={repos}></UserLanguage>
    <SecondTitleStyled>Popular Repositories</SecondTitleStyled>
    {userData && repos && filterRecentlyRepos().map(item =>
    <ListStyled key={item.id}>
      <li>{item.name} <LinkStyled href={`${item.html_url}`}>url:{item.html_url}</LinkStyled></li>
    </ListStyled>
    )}
    </>}
  </article>
)}
