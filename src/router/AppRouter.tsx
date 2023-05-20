import { useRoutes } from "raviger";
import Home from "../components/Home";
import Form from "../components/Form";
import AppContainer from "../AppContainer";
import PreviewForm from "../components/PreviewForm";
import NotFound from "../components/NotFound";

const routes = {
  "/": () => <Home />,
  "/form": () => <Form selectedForm={null} />,
  "/form/:id": ({ id }: { id: string }) => <Form selectedForm={Number(id)} />,
  "/preview/:id": ({ id }: { id: string }) => (
    <PreviewForm formId={Number(id)} />
  ),
  "*": () => <NotFound />
};

export default function AppRouter() {
  let routeResult = useRoutes(routes);

  return <AppContainer>{routeResult}</AppContainer>;
}
