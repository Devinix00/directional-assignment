import QueryProvider from "./providers/QueryProvider";
import Router from "./router/router";
import RootLoading from "./layouts/rootLoading/RootLoading";

export default function App() {
  return (
    <QueryProvider>
      <Router />
      <RootLoading />
    </QueryProvider>
  );
}
