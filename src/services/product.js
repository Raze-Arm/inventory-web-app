import Api from '../apis/inventory-api';

const VER ='/v1'

export const fetchProductPage = async ({page, size,sort, search}) => {
    const response = await Api.get(VER + `/product` , { params: {
            page,
            size,
            sort,
            search
        }});
    return response.data;
}


export const fetchProductList = async () => {
    const response = await Api.get(VER + '/product', {params: {'search-type': 'list'}});
    return response.data;
}
export const fetchProduct = async (id) => {
    const response = await Api.get(VER + `/product/${id}`);
    return response.data;
}

export const downloadProductImage = async (id) => {
    const response = await Api.get(VER + `/v1/download/product/${id}`, {responseType: 'blob'});
    let blob = new Blob([response.data]);
    return blob;
}

export const postProduct = async (product)  => {
    const data = new FormData();
    const image = product?.image;
    if(image) data.append('image', image);
    data.append('name', product.name);
    data.append('price', product.price);
    data.append('salePrice', product.salePrice);
    data.append('description', product.description);
    const response = await Api.post(VER + `/product`, data);
    return response.data;
}
export const updateProduct = async (product) => {
    const data = new FormData();
    const image = product?.image;
    if(image) data.append('image', image);
    data.append('id', product.id);
    data.append('name', product.name);
    data.append('price', product.price);
    data.append('salePrice', product.salePrice);
    data.append('description', product.description);
    const response = await Api.put(VER + `/product` , data);
    return response.data;
}

export const deleteProduct = async (id) => {
    const response = await Api.delete(VER + `/product/${id}`);
    return response.data;
}