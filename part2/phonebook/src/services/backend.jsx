
import axios from "axios"

const baseUrl = "http://localhost:3001/persons";

function axiosGetAll() {
    return axios.get(baseUrl)
    .then(response => response.data)
    .catch(error => console.log(error));
}

function axiosCreate(dataObject) {
    return axios.post(baseUrl, dataObject)
    .then(response => {
        console.log("I got here", response);
        response.data})
    .catch(error => console.log("I messed up", error));

}

function axiosDelete(objectId) {
    return axios.delete(baseUrl + `/${objectId}`)
    .then(response => response.data)
    .catch(error => console.log(error));
}

function axiosUpdate(dataObject) {

    return axios.put(baseUrl + `/${dataObject.id}`, dataObject)
    .then(response => response.data)
    .catch(error => console.log(error));

}

export default {axiosGetAll, axiosUpdate, axiosDelete, axiosCreate}
