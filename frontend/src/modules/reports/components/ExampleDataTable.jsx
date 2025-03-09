import { useEffect } from "react";
import $ from "jquery";

const ExampleDataTable = () => {
  useEffect(() => {
    const table = $("#exampleTable").DataTable({
      paging: false,
      searching: true,
      info: true,
      lengthChange: false,
      pageLength: 20,
      order: [],
      responsive: true,
    });

    return () => {
      table.destroy();
    };
  }, []);

  return (
    <div
      className="m-auto d-block w-100"
      style={{ maxWidth: 1500, overflowX: "auto" }}
    >
      <div className="table-responsive">
        <table id="exampleTable" className="table table-bordered table-hover">
          <thead>
            <tr>
              <th className="py-2">Unit Name</th>
              <th className="py-2">Unit Code</th>
              <th className="py-2">Project ID</th>
              <th className="py-2">Title</th>
              <th className="py-2">Display Name</th>
              <th className="py-2">Statement Frequency</th>
              <th className="py-2">First Statement End Date</th>
              <th className="py-2">Payment Window</th>
              <th className="py-2">Active</th>
              <th className="py-2">Price Must Exceed MFG Cost</th>
              <th className="py-2">Date Updated</th>
              <th className="py-2">Updated By</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>TXF</td>
              <td>TXF</td>
              <td>107</td>
              <td>12 Years in Hell</td>
              <td>/</td>
              <td>Quarterly</td>
              <td>2022-06-30</td>
              <td>0</td>
              <td>true</td>
              <td>false</td>
              <td>2022-08-27</td>
              <td>lynn.is.50@gmail.com</td>
            </tr>
            <tr>
              <td>TXF</td>
              <td>TXF</td>
              <td>1</td>
              <td>2 Aces and a Dirty Heart</td>
              <td>/</td>
              <td>Quarterly</td>
              <td>2022-06-30</td>
              <td>45</td>
              <td>true</td>
              <td>false</td>
              <td>2022-08-27</td>
              <td>lynn.is.50@gmail.com</td>
            </tr>
            <tr>
              <td>TXF</td>
              <td>TXF</td>
              <td>89</td>
              <td>773</td>
              <td>/</td>
              <td>Quarterly</td>
              <td>2022-06-30</td>
              <td>0</td>
              <td>true</td>
              <td>false</td>
              <td>2022-08-27</td>
              <td>lynn.is.50@gmail.com</td>
            </tr>
            <tr>
              <td>TXF</td>
              <td>TXF</td>
              <td>109</td>
              <td>85 Central</td>
              <td>/</td>
              <td>Quarterly</td>
              <td>2022-06-30</td>
              <td>0</td>
              <td>true</td>
              <td>false</td>
              <td>2022-08-27</td>
              <td>lynn.is.50@gmail.com</td>
            </tr>
            <tr>
              <td>TXF</td>
              <td>TXF</td>
              <td>97</td>
              <td>A Detective Story</td>
              <td>/</td>
              <td>Quarterly</td>
              <td>2022-06-30</td>
              <td>0</td>
              <td>true</td>
              <td>false</td>
              <td>2022-08-27</td>
              <td>lynn.is.50@gmail.com</td>
            </tr>
            <tr>
              <td>TXF</td>
              <td>TXF</td>
              <td>70</td>
              <td>Adora</td>
              <td>/</td>
              <td>Quarterly</td>
              <td>2022-06-30</td>
              <td>45</td>
              <td>true</td>
              <td>false</td>
              <td>2022-08-27</td>
              <td>lynn.is.50@gmail.com</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExampleDataTable;
