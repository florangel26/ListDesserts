<template>
  <v-app>
    <v-app-bar
      app
      color="purple lighten-3"
      dark >
      <v-btn color="purple darken-2" to="/" v-if="!user">
        <v-icon>mdi-atom</v-icon>
        <span class="mr-2"> List Desserts </span> 
      </v-btn>
     <v-btn color="purple darken-2" to="/list" v-if="user">
        <v-icon>mdi-atom</v-icon>
        <span class="mr-2"> List Desserts </span> 
      </v-btn>
      <v-spacer></v-spacer>
    <div class="text-center mr-5" >
        <v-btn rounded color="purple darken-4" dark to="/register" v-if="!user">
        Register
        </v-btn>
    </div>
    <div class="text-center mr-5">
       <v-btn rounded color="purple darken-4" dark  to="/login"  v-if="!user">
        Login
       </v-btn>
    </div>
    <div class="text-center mr-5">
       <v-btn  rounded color="purple darken-4" dark  v-if="user"  @click="cerrarSesion"> 
        Logout
       </v-btn>
    </div>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view/>
      </v-container>
      
    </v-main>
  </v-app>
</template>

<script>
 import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";

export default {
    name: "App",
    data: () => ({
        user: null,
    }),
    created() {
        onAuthStateChanged(auth, (user) => {
            this.user = user;
        });
    },
    methods: {
        async cerrarSesion() {
            await signOut(auth);
            this.$router.push("/login");
        },
    },
};
</script>
