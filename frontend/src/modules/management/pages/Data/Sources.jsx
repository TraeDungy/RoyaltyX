import PageHeader from "../../../common/components/PageHeader";

const Sources = () => {
  return (
    <div className="py-3">
      <PageHeader
        title="Sources"
        description="Manage your data sources and link your platforms of choice."
      />

      <div className="row mt-4">
        <div className="col-md-6 pb-4">
          <div className="card p-3 py-4 rounded shadow-lg power-contrast border-0">
            <div className="row">
              <div className="col-md-3 d-flex align-items-center justify-content-center">
                <img
                  src="https://cdn3.iconfinder.com/data/icons/social-network-30/512/social-06-512.png"
                  alt="YouTube Logo"
                  style={{ height: "80px", objectFit: "contain" }}
                />
              </div>
              <div className="col-md-9">
                <h5>Youtube</h5>
                <p className="txt-lighter medium mb-3">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam
                  laborum a veniam velit iure.
                </p>
                <button className="btn btn-black-white">Link YouTube</button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 pb-4">
          <div className="card p-3 py-4 rounded shadow-lg power-contrast border-0">
            <div className="row">
              <div className="col-md-3 d-flex align-items-center justify-content-center">
                <img
                  src="https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_ads-1024.png"
                  alt="YouTube Logo"
                  style={{ height: "80px", objectFit: "contain" }}
                />
              </div>
              <div className="col-md-9">
                <h5>Google Ads</h5>
                <p className="txt-lighter medium mb-3">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam
                  laborum a veniam velit iure.
                </p>
                <button className="btn btn-black-white">Link Google Ads</button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 pb-4">
          <div className="card p-3 py-4 rounded shadow-lg power-contrast border-0">
            <div className="row">
              <div className="col-md-3 d-flex align-items-center justify-content-center">
                <img
                  src="https://logo-marque.com/wp-content/uploads/2020/04/Amazon-Embleme.png"
                  alt="YouTube Logo"
                  style={{ height: "80px", objectFit: "contain" }}
                />
              </div>
              <div className="col-md-9">
                <h5>Amazon</h5>
                <p className="txt-lighter medium mb-3">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam
                  laborum a veniam velit iure.
                </p>
                <button className="btn btn-black-white">Link Amazon</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sources;
