import Api from '../apis/inventory-api';


export const fetchSupplierPage = async  ({page, size, sort,search}) => {
    const response = await Api.get(`/supplier` , { params: {
            page,
            size,
            sort,
            search
        }});
    return response.data;
}

export const fetchSupplierList = async () => {
    const response = await Api.get('/supplier' ,{params: {'search-type': 'list'}});
    return response.data;
}

export const fetchSupplier = async (id) => {
    const response = await Api.get(`/supplier/${id}`);
    return response.data;
}

export const postSupplier = async (supplier)  => {
    const response = await Api.post(`/supplier`, supplier);
    return response.data;
}

export const updateSupplier = async (supplier) => {
    const response = await Api.put(`supplier` , supplier);
    return response.data;
}

export const deleteSupplier = async (id) => {
    const response = await Api.delete(`/supplier/${id}`);
    return response.data;
}




