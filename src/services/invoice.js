import Api from '../apis/inventory-api';

const VER ='/v1'

export const fetchInvoicePage = async ({page, size, sort, search}) => {
    const response = await Api.get(VER + `/invoice`, { params: {
            page,
            size,
            sort,
            search
        }});
    return response.data;
}