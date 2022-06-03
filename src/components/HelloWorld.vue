<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.png')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="deep-purple--text display-2 font-italic mb-3 ">
          Welcome to List Dessert
        </h1>

        <p class=" deep-purple--text subheading font-italic">
          Here you can make your own list of desserts and know their calories
          <br>
         <strong>ENJOY AND SHARE</strong> 
        
        </p>
      </v-col>

    </v-row>
      
  </v-container>
</template>

<script>
  export default {
    name: 'HelloWorld',

  }
</script>
