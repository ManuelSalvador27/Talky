<template>
    <f7-page name="editprofile">
        <f7-navbar title="Edit Profile"></f7-navbar>
        <div class="wrapper">
            <img class="image--cover" :src="image_url" alt="" @click="launchFilePicker">
        </div>

        <f7-list no-hairlines-md>
            <f7-list-input :value="display_name" @input="display_name = $event.target.value" label="Name" type="text"
                placeholder="Your name" clear-button>

            </f7-list-input>

        </f7-list>
        <f7-block>
            <f7-button outline @click="updateProfile">Update Profile</f7-button>
            <input type="file" ref="file" style="display:none;" @change="onFilePicked">

        </f7-block>
    </f7-page>
</template>

<script>
import firebase from 'firebase'
import {
    mixin
} from '../../js/mixin'
export default {
    mixins: [mixin],
    data() {
        return {
            name: null,
            email: null,
            password: null,

        }
    },
    computed: {
        display_name: {
            get: function () {
                return this.$store.getters.display_name
            },
            set: function (newValue) {
                this.$store.commit('setDisplayName', newValue)
            }
        },
        image_url() {
            return this.$store.getters.image_url
        },
        files() {
            return this.$store.getters.files
        },
        photo_url() {
            return this.$store.getters.photo_url
        }
    },
    watch: {

    },

    methods: {
        launchFilePicker() {
            this.$refs.file.click()

        },
        onFilePicked() {
            //read the image file
            this.$store.dispatch('readFile', 'setImageURL')
        },
        updateProfile() {
            const self = this;
            const user = firebase.auth().currentUser;

            if (!user) {
                console.error('No user is authenticated.');
                self.$store.commit("setAlertMessage", "No hay usuario autenticado.");
                return;
            }

            // Si hay archivo de imagen seleccionado
            if (self.files) {
                const storage = firebase.storage();

                // Eliminar imagen anterior si existe
                if (this.photo_url) {
                    try {
                        const httpReference = storage.refFromURL(this.photo_url);
                        httpReference.delete().catch(err => {
                            console.warn('No se pudo eliminar imagen anterior:', err);
                        });
                    } catch (err) {
                        console.warn('photo_url inválido o error al eliminar:', err);
                    }
                }

                // Subir imagen nueva y actualizar perfil
                self.$store.dispatch('uploadFile', 'profile/').then(url => {
                    user.updateProfile({
                        displayName: self.display_name,
                        photoURL: url
                    }).then(() => {
                        self.$store.commit('setPhotoURL', url);
                        self.$store.commit('setDisplayName', self.display_name);

                        firebase.database().ref('users/' + user.uid).update({
                            photo_url: url,
                            name: self.display_name
                        });

                        // ✅ Mensaje de éxito
                        self.$store.commit("setAlertMessage", "Perfil actualizado correctamente");

                    }).catch(err => {
                        console.error('Error al actualizar perfil en Firebase Auth:', err);
                        self.$store.commit("setAlertMessage", "Error al actualizar el perfil");
                    });
                });

            } else {
                // Solo actualizar nombre
                user.updateProfile({
                    displayName: self.display_name
                }).then(() => {
                    self.$store.commit('setDisplayName', self.display_name);

                    // ✅ Mensaje de éxito
                    self.$store.commit("setAlertMessage", "Nombre actualizado correctamente");

                }).catch(err => {
                    console.error('Error al actualizar nombre:', err);
                    self.$store.commit("setAlertMessage", "Error al actualizar el nombre");
                });
            }
        }
    },
    created() {
        if (this.photo_url != null) {
            this.$store.commit('setImageURL', this.photo_url)
        }
    }
}
</script>

<style scoped>
.wrapper {
    text-align: center;
}

.image--cover {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin: 20px;
    object-fit: cover;
    object-position: center;
}
</style>
