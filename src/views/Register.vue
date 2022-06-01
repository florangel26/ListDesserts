<template>
    <div>
        <h1 class="text-center mt-5">Register</h1>

        <v-form v-model="valid" ref="formRegister">
            <v-row justify="center">
                <v-col cols="8" md="4">
                    <v-text-field
                        v-model="user.name"
                        label="Name"
                        :rules="nameRules"
                    />
                    <v-text-field
                        v-model="user.email"
                        label="Email"
                        :rules="emailRules"
                    />
                    <v-text-field 
                    v-model="user.password" 
                    label="Password" 
                    :rules="passwordRules"/>
                    <v-text-field
                        v-model="user.repassword"
                        label="Repassword"
                        :rules="repasswordRules"
                    />
                    <v-btn
                        color="purple darken-4"
                        rounded
                        class="mr-2"
                        :disabled="!valid"
                        @click="registerUser"
                        >Register</v-btn
                    >
                    <v-btn color="error" normal dark rounded @click="reset">Reset</v-btn>
                </v-col>
            </v-row>
        </v-form>
    </div>
</template>

<script>
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../firebase'

export default {
    data() {
        return {
            valid: false,
            user: {
                email: "flory26991@gmail.com",
                password: "123456",
                repassword: "123456",
                name: "florangel",
            },
            emailRules: [
                (v) => (v && !!v.trim()) || "Escribe algo, no espacios!",
                (v) => !!v || "No existe",
                (v) =>
                    /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(v) ||
                    "Formato de email incorrecto",
            ],
             passwordRules: [
            
                (v) => (v && v.length > 5) || "Contraseña sobre 6 carácteres",
                (v) => !!v || "No existe",
            ],
             repasswordRules: [

                (v) => v === this.user.password || "No coinciden las contraseñas",
                (v) => !!v || "No existe",
             ],
            nameRules: [
            (v) => !!v || "No existe",
            (v) => (v && v.length > 5) || "Debe ser sobre 6 carácteres",
            ],
        };
    },
    methods: {
     async registerUser() {
            try {
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    this.user.email,
                    this.user.password
                );
                console.log(userCredential);
                this.$router.push("/list");
            } catch (error) {
                console.log(error.code);
                switch (error.code) {
                    case "auth/email-already-in-use":
                        alert("El correo ya está siendo utilizado");
                        break;
                    case "auth/weak-password":
                        alert("Contraseña minimo 6 carácteres");
                        break;
                    default:
                        alert("Falla de servidor");
                }
            }
    },
         reset() {
            console.log("reset...");
            this.$refs.formRegister.reset();
     },
    }
};
</script>
 