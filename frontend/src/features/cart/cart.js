import { SliderValueLabel } from '@mui/material'
import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  cart: [],
  totalPrice:0,
  totalQuantity:0
  
}



export const cartslice = createSlice({
  name: 'cart',
  initialState,
  reducers: {



    AddToCart: (state, actions) => {
      const find = state.cart.findIndex((value) => value.id === actions.payload.id)
      if (find != -1) {
        state.cart[find] = { ...state.cart[find], quantity: state.cart[find].quantity + 1 }  /// quantity update krne k liye banya hai
      }
      else {
       
        state.cart.push({ ...actions.payload, quantity: 1 })
      }

  

    },




    deleteCartitem: (state, actions) => {
      state.cart = state.cart.filter((value) => value.id !== actions.payload.id)
    },

removeAllProduct: (state) => {
    state.cart = []
},


totalCart:(state) =>{
  const{totalQuantity , totalPrice } = state.cart.reduce((cartTotal, cartItem)=>{
    const {price , quantity} = cartItem
    const itemTotal = parseInt(price)* parseInt(quantity)
    cartTotal.totalPrice +=itemTotal
    cartTotal.totalQuantity += quantity
    return cartTotal

  },{
    totalPrice:0,
    totalQuantity: 0


  });
      state.totalPrice =totalPrice.toFixed(2)
      state.totalQuantity =totalQuantity



},

increaseItemQuantity:(state ,action) =>{
  state.cart = state.cart.map((item)=>{
    if(item.id === action.payload){
      return{...item,quantity: item.quantity +1 };

    }
    return item; 
  })
},

  decreaseItemQuantity:(state, action ) =>{
    state.cart  =state.cart.map((item)=>{
      if(item.id === action.payload){
        return{...item,quantity:item.quantity -1}
      }
    })
  }




  },
})


export const { AddToCart, deleteCartitem,removeAllProduct,totalCart,decreaseItemQuantity,increaseItemQuantity } = cartslice.actions

export default cartslice.reducer