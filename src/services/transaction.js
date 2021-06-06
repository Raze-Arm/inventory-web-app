import Api from '../apis/inventory-api';


export const fetchTransactionPage = async ({page, size,sort, search}) => {
    const response = await Api.get(`/transaction` , { params: {
            page,
            size,
            sort,
            search
        }});
    return response.data;
}

export const fetchSaleTransactionPage = async ({page, size,sort, search}) => {
    const response = await Api.get(`/transaction/sale` , { params: {
            page,
            size,
            sort,
            search
        }});
    return response.data;
}

export const fetchPurchaseTransactionPage = async ({page, size,sort, search}) => {
    const response = await Api.get(`/transaction/purchase` , { params: {
            page,
            size,
            sort,
            search
        }});
    return response.data;
}