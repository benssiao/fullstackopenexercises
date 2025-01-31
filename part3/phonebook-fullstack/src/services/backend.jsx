
import axios from "axios"

const baseUrl = "http://localhost:3001/api/persons";

function axiosGetAll() {
    return axios.get(baseUrl)
    .then(response => {
        return response.data
    })
    .catch(error => {
        console.log(error)
        throw error;
    });
}

function axiosCreate(dataObject) {
    return axios.post(baseUrl, dataObject)
    .then(response => {
        return response.data
    })
    .catch(error => {
        console.log(error)
        throw error;
    });

}

function axiosDelete(objectId) {
    return axios.delete(baseUrl + `/${objectId}`)
    .then(response => {
        return response.data
    })
    .catch(error => {
        console.log(error)
        throw error;
    });
}

function axiosUpdate(dataObject) {

    return axios.put(baseUrl + `/${dataObject.id}`, dataObject)
    .then(response => {
        return response.data
    })
    .catch(error => {
        console.log(error)
        throw error;
    });
    

}

export default {axiosGetAll, axiosUpdate, axiosDelete, axiosCreate}
