import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container, Spinner, Button, Form, Image } from 'react-bootstrap';
import { getProduct, updateProduct } from '../../../products/api/product';
import { apiUrl } from '../../../common/api/config';

const EditProduct = () => {
    const [product, setProduct] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const fetchedProduct = await getProduct(id);
                setProduct(fetchedProduct);
                setTitle(fetchedProduct.title);
                setDescription(fetchedProduct.description);
                setThumbnail(fetchedProduct.thumbnail);
            } catch (error) {
                toast.error(error.message || "Failed to fetch product");
            }
        };

        fetchProduct();
    }, [id]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setPreviewImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);

            if (imageFile) {
                formData.append('thumbnail', imageFile);
            }

            await updateProduct(formData, id);
            toast.success("Product updated successfully");
        } catch (error) {
            toast.error(error.message || "Failed to update product");
        }
    };

    if (!product) {
        return (
            <Container className="d-flex justify-content-center mt-5">
                <Spinner animation="border" />
            </Container>
        );
    }

    return (
        <div className="mt-3">
            <h1 className="bold mb-4">Edit Product</h1>
            {/* Image Preview */}
            <div className="mb-4">
                <Image
                    src={previewImage ? previewImage: thumbnail ? `${apiUrl}${thumbnail}` : 'https://vhx.imgix.net/filmplug/assets/eb2f9876-a8d7-498c-8ea8-79be97d7b423.png?auto=format%2Ccompress&fit=crop&h=720&w=1280'}
                    alt="Product Thumbnail"
                    rounded
                    fluid
                />
                <Form.Group controlId="formProductThumbnail" className="mt-3">
                    <Form.Label>Upload New Thumbnail</Form.Label>
                    <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </Form.Group>
            </div>

            {/* Form for Title and Description */}
            <Form>
                <Form.Group controlId="formProductTitle" className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter product title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formProductDescription" className="mb-4">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={4}
                        placeholder="Enter product description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" onClick={handleSave}>
                    Save Changes
                </Button>
            </Form>
        </div>
    );
};

export default EditProduct;
