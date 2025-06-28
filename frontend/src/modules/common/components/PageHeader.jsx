const PageHeader = ({ title, description = "" }) => {
  return (
    <div>
      <h4 className="bold mb-2">{title}</h4>
      <p className="mb-4 txt-lighter">{description}</p>
    </div>
  );
};

export default PageHeader;
