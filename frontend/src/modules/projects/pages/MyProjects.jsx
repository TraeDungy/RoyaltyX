import React, { useState, useEffect } from 'react'
import ProjectCard from '../components/ProjectCard';
import { getMyProjects } from '../api/project';
import { switchProject } from '../api/project';
import CreateNewProjectCard from '../components/CreateNewProjectCard';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'react-bootstrap-icons';

function MyProjects() {

    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjects = async () => {

            try {
                const fetchedProjects = await getMyProjects();
                setProjects(fetchedProjects);
            } catch (error) {
                console.error('Error fetching :', error);
            }
        };

        fetchProjects();

    }, []);


    const handleSwitchProject = async (project_id) => {
        try {
            await switchProject(project_id);
            navigate("/");
            window.location.reload();

        } catch (error) {
            console.error('Error fetching :', error);
        }
    }


    return (
        <div className='container pt-3'>
            <div className='d-flex justify-content-between align-items-center mt-5 px-2 mb-4'>
                <div>
                    <h4 className='bold'>Projects</h4>
                    <p className='text-muted'>Find all your personal and shared projects</p>
                </div>
                <button onClick={() => {navigate('/projects/create')}} className='btn btn-primary px-4 py-2'><Plus className='me-1 h4 mb-0' /> Create</button>
            </div>

            <div className="row">
                <CreateNewProjectCard />
                {projects.map(project => (
                    <ProjectCard project={project} key={project.id} handleSwitchProject={handleSwitchProject} />
                ))}

            </div>
        </div>
    )
}

export default MyProjects