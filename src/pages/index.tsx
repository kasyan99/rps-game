import { Routes, Route } from "react-router";
import { lazy } from "react";

const GameWithPlayer = lazy(() => import("./game-with-player"));
const Auth = lazy(() => import("./auth"));

export const Routing = () => {
   return (
      <Routes>
         <Route path="/" element={<Auth />} />
         <Route path="/game-with-player" element={<GameWithPlayer />} />
      </Routes>
   );
};
