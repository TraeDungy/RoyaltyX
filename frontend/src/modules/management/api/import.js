import { apiUrl } from "../../common/api/config";

export const getUploadedFiles = async () => {

    const token = localStorage.getItem('accessToken');

    try {
        const response = await fetch(apiUrl+'/data_imports/files/', {
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
};


export const uploadFile = async (file) => {
    const token = localStorage.getItem("accessToken");
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch(apiUrl+"/data_imports/files/", {
            method: "POST",
            body: formData,
            headers: {
                Authorization: "Bearer " + token,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(JSON.stringify(errorData));
        }

        return await response.json();
    } catch (error) {
        console.error("Upload error:", error);
        throw error;
    }
};