import { Routing } from "pages"
import { withProviders } from "./providers"
import './styles'

const App = () => {
  return (
    <div>
      <Routing />
    </div>
  );
};

export default withProviders(App);
