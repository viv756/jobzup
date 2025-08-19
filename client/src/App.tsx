import { Provider } from "react-redux";

import AppRoutes from "./routes";
import { store } from "./redux/store";
import Initializer from "./redux/providers/Iniitializer";

const App = () => {
  return (
    <Provider store={store}>
      <Initializer>
        <AppRoutes />
      </Initializer>
    </Provider>
  );
};

export default App;
