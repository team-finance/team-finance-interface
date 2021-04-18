import { FC } from "react";
import store from "./app/state";
import { Provider } from "react-redux";

const Providers: FC = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
export default Providers;
