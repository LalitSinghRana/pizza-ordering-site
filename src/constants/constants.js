export const BASE_URL = "http://localhost:8080";

export const BASE_USER_URL = "http://localhost:8080/user";
export const USER_LOGIN = BASE_USER_URL + "/login";
export const USER_REGISTER = BASE_USER_URL + "/register";
export const PLACE_ORDER = BASE_USER_URL + "/place-order";
export const VERIFY_USER = BASE_USER_URL + "/:userId/verify/:token";

export const BASE_ADMIN_URL = "http://localhost:8080/user/admin";
export const ADMIN_GET_ORDERS = BASE_ADMIN_URL + "/orders";
export const UPDATE_ORDER_STATUS = BASE_ADMIN_URL + "/update-order-status";

export const BASE_PRODUCTS_URL = "http://localhost:8080/products";
export const ALL_PRODUCTS = BASE_PRODUCTS_URL + "/all";
export const PRODUCT_INVENTORY = BASE_PRODUCTS_URL + "/inventory";
export const CUSTOM_PRODUCT_URL = BASE_PRODUCTS_URL + "/custom";

export const CUSTOM_PRODUCT_ID = "635c18d80624b5338857658e";
