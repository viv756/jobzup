import { Provider } from "react-redux";

import AppRoutes from "./routes";
import { store } from "./redux/store";
import Initializer from "./redux/providers/Initializer";
import { SocketProvider } from "./context/SocketProvider";

const App = () => {
  return (
    <Provider store={store}>
      <Initializer>
        <SocketProvider>
          <AppRoutes />
        </SocketProvider>
      </Initializer>
    </Provider>
  );
};

export default App;
