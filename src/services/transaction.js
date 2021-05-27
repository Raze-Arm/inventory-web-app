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