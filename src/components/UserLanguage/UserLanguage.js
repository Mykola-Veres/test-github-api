import { useEffect, useState } from "react"
import * as GitHubAPI from "../../services/GitHubAPI";
import toast from "react-hot-toast";
import Language from "components/Language";

export default function UserLanguage ({username, repos}) {
  const [loading, setLoading] = useState(false)

            useEffect (() => {
              if (!repos) {return}
              let arrObjLan = []
              async function fetchLanguageUserReposs () {
              try {
                setLoading(false)
                repos.forEach((repo) => {GitHubAPI.fetchRepoLanguages(username, repo.name).then(object => {
                  const entries = Object.entries(object)
                  arrObjLan.push(...[...entries])
                  localStorage.setItem("arrayLanguages", JSON.stringify(arrObjLan));
                  return arrObjLan})
                  })
            }
              catch(error) {toast.error("This didn't work. Thumping went wrong! Try again!!!")
              }
              finally{setLoading(true)
              }
          }
          fetchLanguageUserReposs ()
          },[repos, username])
  return (
    <>
    {loading && <Language ></Language>}
    </>
  )
}
