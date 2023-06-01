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
    isCookieOpen: false,
    shoppingCart: [] as ShoppingCartItem[],
    countOfItemsInShoppingCart: 0,
    fullName: ''
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
    CHANGE_ITEM_FROM_SHOPPING_CART(state, payload:ShoppingCartItem) {
      state.shoppingCart.splice(payload.id, 1, payload);
    },
    ADD_USER_FULL_NAME(state, payload) {
      state.fullName = payload;
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
  },
  actions: {
    changeIsSignIn({commit}) {
      commit('CHANGE_IS_SIGN_IN');
    },
    changeIsCookieOpen({commit}) {
      commit('CHANGE_IS_COOKIE_OPEN');
    },
    changeItemFromShoppingCart({commit}, payload:ShoppingCartItem) {
      commit('CHANGE_ITEM_FROM_SHOPPING_CART', payload);
    },
    addUserFullName({commit}, payload:string) {
      commit('ADD_USER_FULL_NAME', payload);
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
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
