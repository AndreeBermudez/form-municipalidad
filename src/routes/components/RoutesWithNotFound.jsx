import { Navigate, Route, Routes } from "react-router-dom"

export const RoutesWithNotFound = ({children}) => {
  return (
    <Routes>
        {children}
        <Route path="*" element={<Navigate to={'/404'}/>} />
        <Route path="/404" element={<div>Página no encontrada</div>} />
    </Routes>
  )
}