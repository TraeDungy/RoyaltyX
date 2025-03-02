import ProducerUploadInput from "../components/ProducerUploadInput";

const Producers = () => {

    return (
        <div className="py-3">
            <h4 className="bold mb-3">Import Producers</h4>
            <p className="mb-4">
                Manage the product-producer relationship by importing a file listing all the producers and products they are working on.
            </p>

            <ProducerUploadInput />

        </div>
    );
};

export default Producers;
