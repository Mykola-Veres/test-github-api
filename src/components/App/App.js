import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {AppStyled} from "./App.styled";
import { Toaster } from 'react-hot-toast';

const HomePage = lazy(() => import("../../page/HomePage"));
const UserPage = lazy(() => import("../../page/UserPage"));

export default function App () {
  return (
  <AppStyled>
    <Toaster
      position="top-center"
      reverseOrder={false}/>
    <Suspense fallback={"Loading....."}>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/:username" element={<UserPage/>}/>
        <Route path="*" element={<Navigate to="/"/>}/>
      </Routes>
    </Suspense>
  </AppStyled>
  );
};
