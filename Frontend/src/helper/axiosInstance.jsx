import axios from 'axios'


const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
        "Content-type": "application/json"
    }
})

export const getData = (link) => axiosInstance.get(link)

export const updateData = (link, edit) => axiosInstance.put(link, edit)

export const deleteData = (link) => axiosInstance.delete(link)

export const createForm = (link, file) => axiosInstance.post(link, file)

export const sendFiles = (link, files) => axiosInstance.post(link, files)