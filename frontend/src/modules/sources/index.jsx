import { lazy } from "react";

const DeleteData = lazy(() => import("./pages/ManualImport/Delete"));
const ImportData = lazy(() => import("./pages/ManualImport/Import"));
const Source = lazy(() => import("./pages/Source"));
const Sources = lazy(() => import("./pages/Sources"));

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
