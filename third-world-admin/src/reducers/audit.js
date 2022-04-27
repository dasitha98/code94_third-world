export default (audits = [], action) => {
    switch (action.type) {
        case 'DELETE_AUDIT':
            return audits.filter((audit) => audit._id !== action.payload);
        case 'UPDATE_AUDIT':
            return audits.map((audit) => audit._id === action.payload._id ? action.payload : audit)
        case 'FETCH_AUDITS':
            return action.payload
        case 'FETCH_AUDIT':
            return action.payload
        case 'CREATE_AUDIT':
            return [ ...audits, action.payload]
        default:
            return audits;
    }
} 