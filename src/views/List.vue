<template>
    <div  >
        <h1 class="text-center">Listado de Postres</h1>

        <v-form>
            <v-container md="8">
                <v-row  justify="center">
          <v-col cols="8" md="4">
           <v-text-field
             required
            label="Name"
            v-model="dessert.name"/>
            </v-col>
        <v-col cols="8" md="4">
         <v-text-field
          required
           label="Calories"
           v-model="dessert.calories"/>
        </v-col>
                </v-row>
                <v-btn btn-lg block color="purple darken-4" normal dark rounded @click="addDessertForm">ADD</v-btn>
            </v-container>
        </v-form>

        <v-simple-table>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">Name</th>
                        <th class="text-left">Calories</th>
                        <th class="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in desserts" :key="item.id">
                        <td>{{ item.name }}</td>
                        <td>{{ item.calories }}</td>
                        <td class="text-center">
                            <v-btn
                                 rounded
                                class="mr-2"
                                color="red darken-1" dark
                                @click="deleteDessertItems(item.id)"
                                >Delete</v-btn
                            >
                            <v-btn color="error" 
                            rounded
                             @click="activarUpdate(item)"
                                >Edit</v-btn
                            >
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>

        <v-dialog v-model="dialog">
            <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                    Edit
                </v-card-title>
                <v-card-text>
                    <v-form>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="6">
                                    <v-text-field
                                        required
                                        label="Name"
                                        v-model="dessert.name"
                                    />
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field
                                        required
                                        label="Calories"
                                        v-model="dessert.calories"
                                    />
                                </v-col>
                            </v-row>
                            <v-btn
                                block
                                color="purple darken-4 "  x-large dark rounded 
                                @click="updateDessertForm"
                                >UPDATE</v-btn
                            >
                        </v-container>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
    data() {
        return {
            dessert: {
                name: "",
                calories: "",
            },
            dialog: false,
        };
    },
    methods: {
        ...mapActions(["add_dessert", "delete_dessert", "update_dessert", "get_desserts"]),

        addDessertForm() {
            this.add_dessert({ ...this.dessert });
        },
        deleteDessertItems(id) {
            this.delete_dessert(id);
        },
        activarUpdate(item) {
            this.dialog = true;
            this.dessert = item;
        },
        updateDessertForm() {
            console.log(this.dessert);
            this.update_dessert({ ...this.dessert });
            this.dessert = {};
            this.dialog = false;
        },
    },
    computed: {
        ...mapState(["desserts"]),
    },
    created() {
        this.get_desserts();
    },

};
</script>
<style scoped>
.container {
    max-width: 700px;
}


</style>