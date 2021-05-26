import Api from '../apis/inventory-api';


export const fetchProductPage = async ({page, size,sort, search}) => {
    const response = await Api.get(`/product` , { params: {
            page,
            size,
            sort,
            search
        }});
    return response.data;
}


export const fetchProductList = async () => {
    const response = await Api.get('/product', {params: {'search-type': 'list'}});
    return response.data;
}
export const fetchProduct = async (id) => {
    const response = await Api.get(`/product/${id}`);
    return response.data;
}

export const postProduct = async (product)  => {
    const response = await Api.post(`/product`, product);
    return response.data;
}
export const updateProduct = async (product) => {
    const response = await Api.put(`product` , product);
    return response.data;
}

export const deleteProduct = async (id) => {
    const response = await Api.delete(`/product/${id}`);
    return response.data;
}