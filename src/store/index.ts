import { createStore } from 'vuex';
import createPersistedState from "vuex-persistedstate";

interface ShoppingCartItem {
  id: number;
  image: string;
  title: string;
  cost: number;
  count: number;
}

export default createStore({
  state: {
    shoppingCart: [] as ShoppingCartItem[],
  },
  getters: {
  },
  mutations: {
    ADD_ITEM_TO_SHOPPING_CART(state, payload:ShoppingCartItem) {
      state.shoppingCart.push(payload);
    },
    REMOVE_ITEM_FROM_SHOPPING_CART(state, id:number) {
      state.shoppingCart = state.shoppingCart.filter(item => item.id != id);
    },
    CLEAR_SHOPPING_CART(state) {
      state.shoppingCart = [];
    },
    CHANGE_ITEM_FROM_SHOPPING_CART(state, payload:ShoppingCartItem) {
      state.shoppingCart.splice(payload.id, 1, payload);
    }
  },
  actions: {
    addItemToShoppingCart({commit}, payload:ShoppingCartItem) {
      commit('ADD_ITEM_TO_SHOPPING_CART', payload);
    },
    removeItemFromShoppingCart({commit}, id:number) {
      commit('REMOVE_ITEM_FROM_SHOPPING_CART', id);
    },
    clearShoppingCart({commit}) {
      commit('CLEAR_SHOPPING_CART');
    },
    changeItemFromShoppingCart({commit}, payload:ShoppingCartItem) {
      commit('CHANGE_ITEM_FROM_SHOPPING_CART', payload);
    }
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
