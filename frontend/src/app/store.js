import { configureStore } from "@reduxjs/toolkit";
import { authReducer, categoryReducer, subCategoryReducer, productReducer} from "@/features";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        category: categoryReducer,
        subCategory: subCategoryReducer,
        product: productReducer
    },
});