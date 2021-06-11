import Api from '../apis/inventory-api';
const VER ='/v1'


export const fetchSupplierPage = async  ({page, size, sort,search}) => {
    const response = await Api.get(VER + `/supplier` , { params: {
            page,
            size,
            sort,
            search
        }});
    return response.data;
}

export const fetchSupplierList = async () => {
    const response = await Api.get(VER + '/supplier' ,{params: {'search-type': 'list'}});
    return response.data;
}

export const fetchSupplier = async (id) => {
    const response = await Api.get(VER + `/supplier/${id}`);
    return response.data;
}

export const postSupplier = async (supplier)  => {
    const response = await Api.post(VER + `/supplier`, supplier);
    return response.data;
}

export const updateSupplier = async (supplier) => {
    const response = await Api.put(VER + `supplier` , supplier);
    return response.data;
}

export const deleteSupplier = async (id) => {
    const response = await Api.delete(VER + `/supplier/${id}`);
    return response.data;
}




