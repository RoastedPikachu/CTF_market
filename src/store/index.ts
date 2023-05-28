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
    isSignIn: false,
    isCookieOpen: true,
    shoppingCart: [] as ShoppingCartItem[],
    countOfItemsInShoppingCart: 0
  },
  getters: {
  },
  mutations: {
    CHANGE_IS_SIGN_IN(state) {
      state.isSignIn = !state.isSignIn;
    },
    CHANGE_IS_COOKIE_OPEN(state) {
      state.isCookieOpen = !state.isCookieOpen;
    },
    ADD_ITEM_TO_SHOPPING_CART(state, payload:ShoppingCartItem) {
      state.shoppingCart.push(payload);
      state.countOfItemsInShoppingCart++;
    },
    REMOVE_ITEM_FROM_SHOPPING_CART(state, id:number) {
      state.shoppingCart = state.shoppingCart.filter(item => item.id != id);
      state.countOfItemsInShoppingCart--;
    },
    CLEAR_SHOPPING_CART(state) {
      state.shoppingCart = [];
      state.countOfItemsInShoppingCart = 0;
    },
    CHANGE_ITEM_FROM_SHOPPING_CART(state, payload:ShoppingCartItem) {
      state.shoppingCart.splice(payload.id, 1, payload);
    }
  },
  actions: {
    changeIsSignIn({commit}) {
      commit('CHANGE_IS_SIGN_IN');
    },
    changeIsCookieOpen({commit}) {
      commit('CHANGE_IS_COOKIE_OPEN');
    },
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
