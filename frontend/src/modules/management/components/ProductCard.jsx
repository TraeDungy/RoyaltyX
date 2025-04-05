import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { ThreeDotsVertical } from "react-bootstrap-icons";
import { ReactComponent as ProductThumbnailPlaceholder } from '../../common/assets/img/vectors/product-thumbnail-placeholder-lg.svg'
import { apiUrl } from "../../common/api/config";

const ProductCard = ({ product, handleEdit, handleDelete }) => {
    return (
        <div className="col-md-4 pb-4" key={product.id}>
            <div className="card pointer bg-transparent border-0 position-relative">
                {product.thumbnail ? (
                    <div className="card-img-top">
                        <img
                            className="rounded"
                            src={apiUrl + product.thumbnail}
                            alt={product.title}
                        />
                    </div>
                ) : (
                    <div className="card-img-top text-center">
                        <ProductThumbnailPlaceholder />
                    </div>
                )}
                <div className="py-3 d-flex justify-content-between align-items-center">
                    <div>
                        <Link to={'/products/' + product.id} className="h5">{product.title}</Link>
                        <p className="txt-lighter medium">{product.description}</p>
                    </div>
                    <Dropdown>
                        <Dropdown.Toggle variant="link" id="product-dropdown">
                            <ThreeDotsVertical />
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="shadow-sm" style={{ right: 0, transform: 'translateX(-50%)' }}>
                            <Dropdown.Item onClick={() => handleEdit(product.id)}>Edit</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleDelete(product.id)}>Delete</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
