import DeleteData from "./pages/ManualImport/Delete";
import ImportData from "./pages/ManualImport/Import";
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
  },
  {
    path: "/sources/manual-import",
    element: <ImportData />,
  },
  {
    path: "/sources/manual-import/:file_id/delete",
    element: <DeleteData />,
  },
];

export default sourceRoutes;
