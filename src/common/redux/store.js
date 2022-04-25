import { configureStore } from "@reduxjs/toolkit";

import supplierSlice from "./supplierSlice";
import customerSlice from "./customerSlice";
import userSlice from "./userSlice";
import attributeSlice from "./attributeSlice";
import productSlice from "./productSlice";
import sellSlice from "./sellSlice";
import orderSlice from './orderSlice'
export const store=configureStore({
    reducer:{
        supplier:supplierSlice,
        customer:customerSlice,
        user:userSlice,
        attribute:attributeSlice,
        product:productSlice,
        sell:sellSlice,
        order:orderSlice
    }
})