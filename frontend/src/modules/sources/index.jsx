import { Source } from "./pages/Source";
import { Sources } from "./pages/Sources";

const sourceRoutes = [
  {
    path: "/sources",
    element: <Sources />,
  },
  {
    path: "/sources/:sourceId",
    element: <Source />,
  }
];

export default sourceRoutes;
