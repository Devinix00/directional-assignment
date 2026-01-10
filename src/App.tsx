import QueryProvider from "./providers/QueryProvider";
import Router from "./router/router";

export default function App() {
  return (
    <QueryProvider>
      <Router />
    </QueryProvider>
  );
}
