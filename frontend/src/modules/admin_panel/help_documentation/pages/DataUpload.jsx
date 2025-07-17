const DataUpload = () => {
  return (
    <div>
      <h4 className="bold mt-5 mb-3">Data upload</h4>
      <p>
        You can find this feature on the{" "}
        <a className="txt-primary" href="/sources/manual-import">
          /sources/manual-import
        </a>{" "}
        page. There you will see the file upload widget with drag 'n' drop
        supported. Every file needs to be properly formatted with the required
        attributes described in below paragraphs, otherwise some values from the
        file will not be collected if they don't contain all the required
        attributes with correct names.
      </p>

      <div className="pt-5">
        <label>Supported file formats:</label>
        <ul className="my-2">
          <li>CSV</li>
        </ul>
      </div>

      <p className="pt-5">
        For collection of stats about impressions, the following attributes are
        required:
      </p>
      <table className="table table-bordered table-hover my-2">
        <thead>
          <tr>
            <th>Title/program_name/Title Name</th>
            <th>impressions</th>
            <th>Period Start</th>
            <th>Period End</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Example title</td>
            <td>e.g. 342859</td>
            <td>e.g. 2025-05-01</td>
            <td>e.g. 2025-05-31</td>
          </tr>
        </tbody>
      </table>

      <p className="pt-5">
        For collection of stats about sales, the following attributes are
        required:
      </p>
      <table className="table table-bordered table-hover my-2">
        <thead>
          <tr>
            <th>Title/program_name/Title Name</th>
            <th>Consumption Type</th>
            <th>Unit Price</th>
            <th>Unit Price Currency</th>
            <th>Quantity</th>
            <th>Is Refund</th>
            <th>Royalty Amount</th>
            <th>Royalty Currency</th>
            <th>Period Start</th>
            <th>Period End</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Example title</td>
            <td>rental/purchase</td>
            <td>e.g. 3.14</td>
            <td>e.g. USD</td>
            <td>e.g. 1</td>
            <td>e.g. Yes/No</td>
            <td>e.g. 0.5</td>
            <td>e.g. USD</td>
            <td>e.g. 2025-05-01</td>
            <td>e.g. 2025-05-31</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DataUpload;
