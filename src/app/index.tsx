import { Routing } from "pages";
import { withProviders } from "./providers";
import './styles/index.scss'
const App = () => {
  return (
    <div>
      <Routing />
    </div>
  );
};

export default withProviders(App);
