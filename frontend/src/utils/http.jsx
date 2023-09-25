import axios from "axios"

const defaultUrl = ''


export async function getProduct() {
    const response = await axios.get(defaultUrl + '/product.json')
    try {
        let productData = []
        for (const key in response.data) {
            productData.push({ ...response.data[key], 'key': key })
        }
        return productData
    }
    catch (e) {
        return e
    }
}

export async function postProduct(value) {
    const response = await axios.post(defaultUrl + '/product.json', value)
    try {
        return response
    }
    catch (e) {
        return e
    }
}

export async function updateProduct(value, key) {
    const response = await axios.put(defaultUrl + '/product/' + key + '.json', value)
    try {
        return response
    }
    catch (e) {
        return e
    }
}