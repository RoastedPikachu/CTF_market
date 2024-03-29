import { createStore } from 'vuex';
import createPersistedState from "vuex-persistedstate";

interface ShoppingCartItem {
  id: number,
  title: string,
  price: number,
  size: string,
  count: number,
  photo: string
}

export default createStore({
  state: {
    isSignIn: false,
    isAdmin: false,
    isCookieOpen: false,
    shoppingCart: [] as ShoppingCartItem[],
    countOfItemsInShoppingCart: 0,
    totalCost: 0,
    fullName: ''
  },
  getters: {
  },
  mutations: {
    CHANGE_IS_SIGN_IN(state) {
      state.isSignIn = !state.isSignIn;
    },
    CHANGE_IS_ADMIN(state) {
      state.isAdmin = !state.isAdmin;
    },
    CHANGE_IS_COOKIE_OPEN(state) {
      state.isCookieOpen = !state.isCookieOpen;
    },
    CHANGE_TOTAL_COST_VALUE(state, payload) {
      state.totalCost = payload;
    },
    CHANGE_ITEM_FROM_SHOPPING_CART(state, payload:ShoppingCartItem) {
      state.shoppingCart.forEach(item => {
        if(item.id === payload.id) {
          item.count = payload.count;
        }
      });
    },
    ADD_USER_FULL_NAME(state, payload) {
      state.fullName = payload;
    },
    ADD_ITEM_TO_SHOPPING_CART(state, payload:ShoppingCartItem) {
      let duplicateItemId = 0;

      state.shoppingCart.forEach(item => {
        if(item.id == payload.id) {
          duplicateItemId = item.id;

          item.count++;
        }
      });

      if(!duplicateItemId) {
        state.shoppingCart.push(payload);
        state.countOfItemsInShoppingCart++;
      }
    },
    REMOVE_ITEM_FROM_SHOPPING_CART(state, id:number) {
      state.shoppingCart = state.shoppingCart.filter(item => item.id != id);
      state.countOfItemsInShoppingCart--;
    },
    CLEAR_IS_COOKIE_OPEN(state) {
      state.isCookieOpen = false;
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
    changeIsAdmin({commit}) {
      commit('CHANGE_IS_ADMIN');
    },
    changeIsCookieOpen({commit}) {
      commit('CHANGE_IS_COOKIE_OPEN');
    },
    changeTotalCostValue({commit}, payload:number) {
      commit('CHANGE_TOTAL_COST_VALUE', payload);
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
    clearIsCookieOpen({commit}) {
      commit('CLEAR_IS_COOKIE_OPEN');
    },
    clearShoppingCart({commit}) {
      commit('CLEAR_SHOPPING_CART');
    },
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
