const ProducerUpload = () => {
  return (
    <div>
      <h4 className="bold mt-5 mb-3">Producer upload</h4>
      <p>
        You can find this feature on the{" "}
        <a className="txt-primary" href="/management/producers">
          /management/producers
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
        For this feature to properly collect producer info and connect producers
        to the products their products make sure that your file includes the
        following columns:
      </p>
      <table className="table table-bordered table-hover my-2">
        <thead>
          <tr>
            <th>title</th>
            <th>email</th>
            <th>producer fee</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Example title</td>
            <td>email@example.com</td>
            <td>e.g. 30 (don't include the % sign)</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProducerUpload;
