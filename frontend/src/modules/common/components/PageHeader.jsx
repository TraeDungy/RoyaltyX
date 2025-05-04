const PageHeader = ({ title, description = "" }) => {
  return (
    <div>
      <h4 className="bold mb-3">{title}</h4>
      <p className="mb-4">{description}</p>
    </div>
  );
};

export default PageHeader;
