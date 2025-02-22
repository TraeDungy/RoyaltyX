import { createContext, useState, useContext, useEffect } from "react";
import { getProjectInfo } from "../../projects/api/project";
import { toast } from "react-toastify";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
    const [project, setProject] = useState(null);

    useEffect(() => {
        const fetchProjectInfo = async () => {
            try {
                const data = await getProjectInfo();
                setProject(data);
            } catch (error) {
                toast.error(error.message || "Failed to fetch project info");
            }
        };

        fetchProjectInfo();
    }, []);

    return (
        <ProjectContext.Provider value={{ project }}>
            {children}
        </ProjectContext.Provider>
    );
};

export const useProject = () => useContext(ProjectContext);
