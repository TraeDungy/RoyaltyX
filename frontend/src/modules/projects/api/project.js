import { apiUrl } from "../../common/api/config";

export const getMyProjects = async () => {

    try {

        const token = localStorage.getItem('token');

        const response = await fetch(apiUrl + '/my-projects', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });

        const responseData = await response.json();

        if (response.ok) {
            return responseData;
        } else {
            throw new Error(responseData.errors);
        }
    } catch (error) {
        throw new Error(error);
    }

}

export const getProjectMembers = async () => {

    try {

        const token = localStorage.getItem('token');

        const response = await fetch(apiUrl + '/project/members', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });

        const responseData = await response.json();

        if (response.ok) {
            return responseData;
        } else {
            throw new Error(responseData.errors);
        }
    } catch (error) {
        throw new Error(error);
    }

}

export const getProjectInfo = async () => {

    try {

        const token = localStorage.getItem('token');

        const response = await fetch(apiUrl + '/project-info', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });

        const responseData = await response.json();

        if (response.ok) {
            return responseData;
        } else {
            throw new Error(responseData.errors);
        }
    } catch (error) {
        throw new Error(error);
    }

}

export const switchProject = async (project_id) => {

    try {

        const token = localStorage.getItem('token');

        const data = {
            "project_id": project_id
        }

        const response = await fetch(apiUrl + '/switch-project', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();

        return responseData;

    } catch (error) {
        return error;
    }

}

export const updateProjectInfo = async (name, description) => {

    try {

        const token = localStorage.getItem('token');

        const data = {
            "name": name,
            "description": description
        }

        const response = await fetch(apiUrl + '/project', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();

        return responseData;

    } catch (error) {
        return error;
    }

}

export const saveProject = async (project) => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(apiUrl + '/projects', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            body: project
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message || 'Failed to save project');
        }

        return responseData;

    } catch (error) {
        throw error;
    }
};

export const updateProject = async (project) => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(apiUrl + '/projects/update', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            body: project
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message || 'Failed to save project');
        }

        return responseData;

    } catch (error) {
        throw error;
    }
};