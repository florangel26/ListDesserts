<template>
    <div>
        <h1 class="text-center">Login</h1>
        <v-form v-model="valid" ref="formRegister">
            <v-row justify="center">
                <v-col cols="8" md="4">
                    <v-text-field
                        v-model="user.email"
                        label="Email"
                        :rules="emailRules"
                    />
                    <v-text-field
                        v-model="user.password"
                        label="Password"
                        :rules="passwordRules"
                    />
                    <v-btn
                       color="purple darken-4"
                        rounded
                        class="mr-2"
                        :disabled="!valid"
                        @click="loginUser"
                        >Login</v-btn
                    >
                    <v-btn color="error" normal dark rounded @click="reset">Reset</v-btn>
                </v-col>
            </v-row>
        </v-form>
    </div>
</template>

<script>
import { auth } from '../firebase'
import { signInWithEmailAndPassword } from '@firebase/auth';

export default {
    data() {
        return {
            valid: false, 
            user: {
                email: "",
                password: "",
            },
            emailRules: [
                (v) => (v && !!v.trim()) || "Escribe algo, no espacios!",
                (v) => !!v || "No existe",
                (v) =>
                    /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(v) ||
                    "Formato de email incorrecto",
            ],
            passwordRules: [
                (v) => !!v || "No existe",
                (v) => (v && v.length > 5) || "Debe ser sobre 6 carácteres",
            ],
        };
    },
    methods: {
        loginUser() {
            signInWithEmailAndPassword(
                auth,
                this.user.email,
                this.user.password
            )
                .then((userCredential) => {
                    console.log(userCredential);
                    this.$router.push("/list");
                })
                .catch((e) => {
                    alert("Datos Incorrectos"),
                    console.log(e.code);
                });
        },
        reset() {
            console.log("reset...");
            this.$refs.formRegister.reset();
        },
    },
};
</script>