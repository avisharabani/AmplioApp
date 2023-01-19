import configData from '../configData.json';

const apiUrl = configData.SERVER_URL;

export const restHelper = () => {

    const callAPI = async (subUrl, options) => {

        const defaultHTTPHeaders = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        }

        options.mode = 'cors';

        options.headers = options.headers
            ? { ...defaultHTTPHeaders, ...options.headers }
            : defaultHTTPHeaders

        options.body = JSON.stringify(options.body) || false
        if (!options.body) delete options.body

        try {
            const apiResponse = await fetch(apiUrl + subUrl, options)
            return await apiResponse.json()
        } catch (error) {
            return error
        }
    }

    //calling get API for fetching data
    const get = (subUrl, options = {}) => {
        options.method = 'GET'
        return callAPI(subUrl, options)
    }
    const postCreate = (subUrl, options = {}) => {
        options.method = 'POST'
        return callAPI(subUrl, options)
    }

    const putUpdate = (subUrl, options = {}) => {
        options.method = 'PUT'
        return callAPI(subUrl, options)
    }

    const deleteData = (subUrl, options = {}) => {
        options.method = 'DELETE'
        return callAPI(subUrl, options)
    }

    return {
        get,
        postCreate,
        putUpdate,
        deleteData,
    }
}