import { useEffect, useState } from "react";
import {TitleStyled, ListStyled} from "./Language.styled";

export default function Language () {
  const [arrObjLang] = useState(JSON.parse(localStorage.getItem("arrayLanguages")));
  const [renderArr, setRenderArr] = useState(null);

  useEffect(()=> {
    if(!arrObjLang){return}
    let objectUniqueLanguages = {};
    let arrayLanguages = [];
    let arrayObjects = [];

    arrObjLang.forEach(([name, value]) => {
      arrayObjects.push({name, value,})
      objectUniqueLanguages[name] = 0
    })

      arrayObjects.forEach(({name, value}) => {
        for(const key in objectUniqueLanguages) {
          if(key === name) {objectUniqueLanguages[key] += value}
        }})

      const values = Object.values(objectUniqueLanguages);
      const sumWithInitial = values.reduce(
        (previousValue, currentValue) => previousValue + currentValue, 0);

      for(const key in objectUniqueLanguages) {
        arrayLanguages.push({
          name: key,
          value: objectUniqueLanguages[key],
          total: sumWithInitial,
        })}

      setRenderArr(arrayLanguages)
  }, [arrObjLang])

return (
  <>
  <TitleStyled>Languages</TitleStyled>
  <ListStyled>
    {renderArr && renderArr.map(item =>
    <li key={item.name}>{item.name}: {Math.round(item.value*100/item.total)}%</li>)}
  </ListStyled>
  </>
)}
