import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { ThreeDotsVertical } from "react-bootstrap-icons";

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/management/products/${product.id}/edit`);
    }

    const handleDelete = () => {
        
    }

    return (
        <div className="col-md-4 pb-4" key={product.id}>
            <div className="card pointer bg-transparent border-0">
                <div className="card-img-top">
                    <img
                        src="https://vhx.imgix.net/filmplug/assets/eb2f9876-a8d7-498c-8ea8-79be97d7b423.png?auto=format%2Ccompress&fit=crop&h=720&w=1280"
                        alt={product.title}
                    />
                </div>
                <div className="py-3 d-flex justify-content-between align-items-center">
                    <div>
                        <Link to={'/products/' + product.id} className="h5">{product.title}</Link>
                        <p className="txt-lighter medium">{product.description}</p>
                    </div>
                    <Dropdown>
                        <Dropdown.Toggle variant="link" id="product-dropdown">
                            <ThreeDotsVertical />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={handleEdit}>Edit</Dropdown.Item>
                            <Dropdown.Item onClick={handleDelete}>Delete</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
