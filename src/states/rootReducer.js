
import userReducer from "./modules/user"
import productReducer from "./modules/product"

const rootReducer = {
  user: userReducer,
  product: productReducer
}

export default rootReducer
