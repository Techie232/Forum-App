const BASE_URL = import.meta.env.VITE_BASE_URL;

export const endPoints = {
   REGISTER_API: BASE_URL + '/auth/register',
   LOGIN_API: BASE_URL + '/auth/login',
}

export const doubtPoints = {
   CREATE_DOUBT_API: BASE_URL + '/doubt/create',
   GET_ALL_DOUBT_API: BASE_URL + '/doubt/getAll',
   GET_ONE_DOUBT_API: BASE_URL + '/doubt/getSpecificDoubt',
}

export const commentPoints = {
   CREATE_COMMENT_API: BASE_URL + '/comment/create',
   DELETE_COMMENT_API: BASE_URL + '/comment/delete',
}