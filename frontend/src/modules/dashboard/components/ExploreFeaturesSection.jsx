import {
  Bell,
  Envelope,
  Git,
  GraphUpArrow,
  Search,
  ShieldCheck,
} from "react-bootstrap-icons";

export const ExploreFeaturesSection = () => {
  return (
    <>
      <div className="mt-4 mb-3 ps-1">
        <h3 className="bold">Explore Features</h3>
      </div>

      <div className="row">
        <div className="col-md-3 pb-4">
          <div
            className="card border-0 h-100"
            style={{
              background:
                "linear-gradient(135deg,rgba(107, 17, 203, 0.50),rgba(37, 116, 252, 0.5))",
              color: "#fff",
            }}
          >
            <div className="card-body d-flex flex-column justify-content-between">
              <div className="">
                <Search className="h3 mb-3" />
                <h5>Smart search</h5>
                <p className="medium">
                  Use advanced algorithms to find specific information.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 pb-4">
          <div
            className="card border-0 h-100"
            style={{
              background:
                "linear-gradient(135deg,rgba(255, 126, 180, 0.5),rgba(255, 117, 140, 0.5))",
              color: "#fff",
            }}
          >
            <div className="card-body d-flex flex-column justify-content-between">
              <div className="">
                <Git className="h3 mb-3" />
                <h5>Updated reporting</h5>
                <p className="medium">
                  Keep track of versions to ensure data integrity.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 pb-4">
          <div
            className="card border-0 h-100"
            style={{
              background:
                "linear-gradient(135deg,rgba(17, 153, 142, 0.5),rgba(56, 239, 126, 0.5))",
              color: "#fff",
            }}
          >
            <div className="card-body d-flex flex-column justify-content-between">
              <div className="">
                <GraphUpArrow className="h3 mb-3" />
                <h5>Custom analytics</h5>
                <p className="medium">
                  Access your notes across all your work apps.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 pb-4">
          <div
            className="card border-0 h-100"
            style={{
              background:
                "linear-gradient(135deg,rgba(255, 65, 109, 0.5),rgba(255, 75, 43, 0.5))",
              color: "#fff",
            }}
          >
            <div className="card-body d-flex flex-column justify-content-between">
              <div className="">
                <Envelope className="h3 mb-3" />
                <h5>Generate reports</h5>
                <p className="medium">
                  Embed images, links & files to create notes.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 pb-4">
          <div
            className="card border-0 h-100"
            style={{
              background:
                "linear-gradient(135deg,rgba(252, 75, 26, 0.5),rgba(247, 182, 51, 0.5))",
              color: "#fff",
            }}
          >
            <div className="card-body d-flex flex-column justify-content-between">
              <div className="">
                <Bell className="h3 mb-3" />
                <h5>Reminders & alerts</h5>
                <p className="medium">
                  Sets reminders and alerts for upcoming deadlines or tasks.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 pb-4">
          <div
            className="card border-0 h-100"
            style={{
              background:
                "linear-gradient(135deg,rgba(5, 118, 230, 0.5),rgba(0, 242, 97, 0.5))",
              color: "#fff",
            }}
          >
            <div className="card-body d-flex flex-column justify-content-between">
              <div className="">
                <ShieldCheck className="h3 mb-3" />
                <h5>Encryption</h5>
                <p className="medium">
                  Implements end-to-end encryption for robust security.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
