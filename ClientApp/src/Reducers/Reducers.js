const iState = {
    transactionDetails : {},
    customerDetails : {},
    pgType : ""
}

const reducers = (state = iState,action) =>
{
    switch (action.type) {
        case 'GET_TRANSACTION_DETAILS':
            return {
                ...state,
                transactionDetails: action.payload
            }
        
        case 'GET_CUSTOMER_DETAILS' :
            return{
                ...state,
                customerDetails : action.payload
            }

        case 'GET_PGTYPE' :
            return{
                ...state,
                pgType : action.payload
            }
            default:
                return state;
        }
}
export default reducers;