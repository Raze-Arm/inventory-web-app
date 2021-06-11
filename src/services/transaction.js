import Api from '../apis/inventory-api';
const VER ='/v1'


export const fetchTransactionPage = async ({page, size,sort, search}) => {
    const response = await Api.get(VER +`/transaction` , { params: {
            page,
            size,
            sort,
            search
        }});
    return response.data;
}

export const fetchSaleTransactionPage = async ({page, size,sort, search}) => {
    const response = await Api.get(VER +`/transaction/sale` , { params: {
            page,
            size,
            sort,
            search
        }});
    return response.data;
}

export const fetchPurchaseTransactionPage = async ({page, size,sort, search}) => {
    const response = await Api.get(VER +`/transaction/purchase` , { params: {
            page,
            size,
            sort,
            search
        }});
    return response.data;
}