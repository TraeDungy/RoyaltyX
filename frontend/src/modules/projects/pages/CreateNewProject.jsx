import React, { useState, useRef } from 'react'
import { saveProject } from '../api/project';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import placeholderProjectImage from '../../common/assets/img/icons/projectPlaceholderIcon.jpg';
import { Camera } from 'react-bootstrap-icons';
import Button from '../../common/components/Button';

function CreateNewProject() {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [logo, setLogo] = useState(null);
    const [preview, setPreview] = useState(placeholderProjectImage);
    const inputRef = useRef(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setLogo(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError('');

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);

        if (logo) {
            formData.append('logo', logo);
        }

        try {
            await saveProject(formData);

            setName('');
            setDescription('');
            setLogo(null);
            setPreview(placeholderProjectImage);

            navigate("/");
            toast.success("Successfully added a new project!");


        } catch (error) {
            toast.error(error.message);
        }

        setLoading(false);
    };


    return (
        <div id='create-project-page-wrapper'>

            <div className='container w-100 h-100 d-flex flex-column' style={{ minHeight: '80vh', maxWidth: 850 }}>

                <div className='px-5 pt-3 w-100'>
                    <h3 className="bold mt-4 mb-2">
                        Add Project
                    </h3>
                    <span className='text-muted medium'>Empower your projects with ease. Streamline creation and management effortlessly.</span>
                    <br />

                    {error && <span className='text-danger small'>{error}</span>}


                    <label className='mt-4'>Logo</label>

                    <div
                        style={{ maxWidth: 75 }}
                        className="mt-2 position-relative profile-image"
                    >
                        <img
                            src={preview}
                            className="img-fluid rounded hover"
                            style={{ aspectRatio: 1, objectFit: "cover" }}
                            alt="Project logo"
                        />
                        <input
                            ref={inputRef}
                            onChange={handleFileChange}
                            type="file"
                            style={{ height: 0, width: 0 }}
                            className="invisible position-absolute"
                        />
                        <button
                            className="project-image-overlay"
                            onClick={() => inputRef?.current?.click()}
                        >
                            <Camera className="text-white" />
                        </button>
                    </div>

                    <label className='pb-2 mt-4'>Name</label>
                    <input type="text" className='form-control medium bg-gray-light py-3'
                        placeholder='Project name' value={name} autoComplete="new-password"
                        onChange={(e) => setName(e.target.value)} />

                    <label className='mt-4 mb-2'>Description</label>
                    <textarea type="text" className='form-control bg-gray-light py-2 medium'
                        placeholder='Project description' value={description} autoComplete="new-password"
                        onChange={(e) => setDescription(e.target.value)} style={{ height: 130 }} />

                    <div className='pt-4'>
                        <Button variant="primary" size="sm" onClick={handleSubmit} loading={loading}>Add Project</Button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CreateNewProject