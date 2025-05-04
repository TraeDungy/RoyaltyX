export const StatsCard = ({ title, value }) => {
  return (
    <div className="col-md-4 p-3">
      <div className="p-3 d-flex justify-content-center rounded flex-column w-100 h-100 border-custom-regular">
        <h6 className="mb-2">{title}</h6>
        <h3 className="bold txt-primary mb-0">{value}</h3>
      </div>
    </div>
  );
};
