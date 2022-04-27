const authReducer = (state = { authData: null, userList: [], dashboardInfo: null }, action) => {
    switch (action.type) {
      case 'AUTH':
        localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
        return { ...state, authData: action.data, loading: false, errors: null };

      case 'CREATE_USER':
        return { ...state, loading: false, errors: null };

      case 'USER_DATA':
          return { ...state, authData: action.data, loading: false, errors: null };

      case 'GET_DASHBOARD_INFO':
        return { ...state, dashboardInfo: action.payload, loading: false, errors: null };

      case 'UPDATE_USER':
          return { ...state, loading: false, errors: null };
        
      case 'FETCH_USERS':
          return { ...state, userList: action.payload, loading: false, errors: null };

      case 'DELETE_USER':
          const userList = state.userList.filter((element) => element._id !== action.payload);
          return { ...state, userList, loading: false, errors: null };
          
      case 'LOGOUT':
        localStorage.clear();
        return { ...state, authData: null, loading: false, errors: null };
      default:
        return state;
    }
  };
  
  export default authReducer;