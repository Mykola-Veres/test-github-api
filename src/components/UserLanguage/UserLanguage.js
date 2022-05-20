import { useEffect, useState } from "react"
import * as GitHubAPI from "../../services/GitHubAPI";
import toast from "react-hot-toast";
import {TitleStyled, ListStyled} from "./Language.styled";

export default function UserLanguage ({username, repos}) {
  const [lang, setLang] = useState(null)

            useEffect (() => {
              if (!repos) {return}
              async function fetchLanguageUserReposs () {
              try {
                const promises = repos.map(repo => GitHubAPI.fetchRepoLanguages(username, repo.name));

                Promise.all(promises).then(results =>{
                console.log("results", results);
                  const allLanguages = results.reduce((acc, obj) => {
                    const entries = Object.entries(obj)
                    acc.push(...entries)
                    return acc
                  }, [])
                // console.log("allLanguages",allLanguages)
                
                  const uniqueLanguages = allLanguages.reduce((acc, entries) => {
                    acc[entries[0]] = 0
                    return acc
                  }, {})
                // console.log("uniqueLanguages",uniqueLanguages)

                allLanguages.reduce((acc, entries) => {
                    for(const key in uniqueLanguages) {
                      if(key === entries[0]) {uniqueLanguages[key] += entries[1]}
                    }
                    return acc
                  }, [])
                  setLang(uniqueLanguages)
              })
            }
              catch(error) {toast.error("This didn't work. Thumping went wrong! Try again!!!")
              }
          }
          fetchLanguageUserReposs ()
          },[repos, username])

          // function count (){
          //   if (!lang) {return}
          //   const values = Object.values(lang);
          // const sumWithInitial = values.reduce(
          // (previousValue, currentValue) => previousValue + currentValue, 0);

          const allLanguage = []
          for(const key in lang) {
            allLanguage.push({
              name: key,
              value: lang[key],
              // total: sumWithInitial,
            })}
          console.log("lang",lang)
          console.log("allLanguage", allLanguage)
  return (
    <>
    <TitleStyled>Languages</TitleStyled>
  <ListStyled>

  {lang && allLanguage.map(item =>
    <li key={item.name}>{item.name}: {item.value}</li>)}
    {/* {lang && allLang.map(item =>
    <li key={item.name}>{item.name}: {Math.round(item.value*100/item.total)}%</li>)} */}
  </ListStyled>
    </>
  )
}
