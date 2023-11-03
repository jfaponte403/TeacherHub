export const postData = async (axiosInstance: any, endpoint: string, data: any, headers: any) => {
    try{
        return await axiosInstance.post(endpoint, data, {headers}); // Not return just the data, we want to know the status code
    } catch (error) {
        throw error;
    }
}

export const getData = async (axiosInstance: any, endpoint: string, headers: any) => {
    try{
        return await axiosInstance.get(endpoint, {headers}); // Not return just the data, we want to know the status code
    } catch (error) {
        throw error;
    }
}

export const putData = async (axiosInstance: any, endpoint: string, data: any, headers: any) => {
    try{
        return await axiosInstance.put(endpoint, data, {headers}); // Not return just the data, we want to know the status code
    } catch (error) {
        throw error;
    }
}

export const deleteData = async (axiosInstance: any, endpoint: string, headers: any) => {
    try{
        return await axiosInstance.delete(endpoint, {headers}); // Not return just the data, we want to know the status code
    } catch (error) {
        throw error;
    }
}
