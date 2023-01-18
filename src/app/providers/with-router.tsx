import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";

export const withRouter = (component: () => React.ReactNode) => () =>
(
   <BrowserRouter>
      <Suspense
         fallback={<div>Loaging...</div>}
      >
         {component()}
      </Suspense>
   </BrowserRouter>
);