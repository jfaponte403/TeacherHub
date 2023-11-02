export const postData = async (axiosInstance: any, endpoint: string, data: any, headers: any) => {
    try{
        const response = await axiosInstance.post(endpoint, data, { headers});
        return response; // Not return just the data, we want to know the status code
    } catch (error) {
        throw error;
    }
}

export const getData = async (axiosInstance: any, endpoint: string, headers: any) => {
    try{
        const response = await axiosInstance.get(endpoint, { headers});
        return response; // Not return just the data, we want to know the status code
    } catch (error) {
        throw error;
    }
}

export const putData = async (axiosInstance: any, endpoint: string, data: any, headers: any) => {
    try{
        const response = await axiosInstance.put(endpoint, data, { headers});
        return response; // Not return just the data, we want to know the status code
    } catch (error) {
        throw error;
    }
}

export const deleteData = async (axiosInstance: any, endpoint: string, headers: any) => {
    try{
        const response = await axiosInstance.delete(endpoint, { headers});
        return response; // Not return just the data, we want to know the status code
    } catch (error) {
        throw error;
    }
}
