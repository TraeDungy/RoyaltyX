import { Button } from "@mui/material";
import { ExclamationCircleFill } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";

function PageNotFound() {
  const { t } = useTranslation();

  return (
    <section className="py-3 py-md-5 min-vh-100 d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="text-center">
              <h1 className="d-flex justify-content-center align-items-center gap-2 mb-4">
                <span className="display-1 fw-bold">4</span>
                <ExclamationCircleFill className="text-danger" />
                <span className="display-1 fw-bold bsb-flip-h">4</span>
              </h1>
              <h1 className="bold mb-2">{t('oops_lost')}</h1>
              <p className="mb-5">{t('not_found')}</p>
              <Button variant="contained" color="primary">
                {t('back_to_home')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PageNotFound;
