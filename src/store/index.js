import Vue from "vue";
import Vuex from "vuex";
import { nanoid } from "nanoid";
import {addDoc, collection, onSnapshot, query} from "firebase/firestore"
import {db} from  "../firebase"
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        desserts: [],
    },
    mutations: {
        ADD_DESSERT(state, payload) {
            state.desserts.push(payload);
        },
        DELETE_DESSERT(state, payload) {
            state.desserts = state.desserts.filter(
                (item) => item.id !== payload
            );
        },
        UPDATE_DESSERT(state, payload) {
            state.desserts = state.desserts.map((item) =>
                item.id === payload.id ? payload : item
            );
        },
        GET_DESSERTS(state, payload) {
            state.desserts = payload;
        },
    },
    actions: {
        async get_desserts({ commit }) {
            try {
                const q = query(
                    collection(db, "desserts"),
                    where("uid", "==", auth.currentUser.uid)
                );
                onSnapshot(q, (querySnapshot) => {
                    const desserts = [];
                    querySnapshot.forEach((doc) => {
                        desserts.push({
                            id: doc.id,
                            ...doc.data(),
                        });
                    });
                    commit("GET_DESSERTS", desserts);
                });
            } catch (error) {
            }
        },
        async add_dessert({ commit }, dessert) {
        dessert.id = nanoid(6);
          try {
              await addDoc(collection(db, "desserts"),{
                  name: dessert.name,
                  calories: dessert.calories,
              });
              
          } catch (error) {
              console.log(error);
          }   
            commit("ADD_DESSERT", dessert);
        },
        delete_dessert({ commit }, id) {
            commit("DELETE_DESSERT", id);
        },
        update_dessert({ commit }, dessert) {
            commit("UPDATE_DESSERT", dessert);
        },
    },
});