import { Breadcrumb } from "react-bootstrap";
import { useLocation, Link } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const formatName = (name) =>
    name.replace(/[-_]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <Breadcrumb aria-label="breadcrumb">
      <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
        Dashboard
      </Breadcrumb.Item>

      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        return (
          <Breadcrumb.Item
            key={index}
            linkAs={!isLast ? Link : undefined}
            linkProps={!isLast ? { to: routeTo } : undefined}
          >
            {formatName(name)}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
