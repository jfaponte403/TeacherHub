export const postData = async (axiosInstance: any, endpoint: string, data: any) => {
    try{
        const response = await axiosInstance.post(endpoint, data);
        return response; // Not return just the data, we want to know the status code
    } catch (error) {
        throw error;
    }
}

export const getData = async (axiosInstance: any, endpoint: string) => {
    try{
        const response = await axiosInstance.get(endpoint);
        return response; // Not return just the data, we want to know the status code
    } catch (error) {
        throw error;
    }
}

export const putData = async (axiosInstance: any, endpoint: string, data: any) => {
    try{
        const response = await axiosInstance.put(endpoint, data);
        return response; // Not return just the data, we want to know the status code
    } catch (error) {
        throw error;
    }
}

export const deleteData = async (axiosInstance: any, endpoint: string) => {
    try{
        const response = await axiosInstance.delete(endpoint);
        return response; // Not return just the data, we want to know the status code
    } catch (error) {
        throw error;
    }
}