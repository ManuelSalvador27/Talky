<template>
    <f7-page name="Contacts">
        <f7-navbar title="Contacts" back-link="Back"></f7-navbar>
        <f7-list media-list>
            <f7-list-item swipeout v-for="(contact, index) in contacts" :key="index" :title="contact.name">
                <img class="small-avatar" slot="media" :src="contact.photo_url" @error="setDefaultImage" />
                <f7-swipeout-actions right>
                    <f7-swipeout-button color="green" @click="addFriend(contact)">Add</f7-swipeout-button>
                </f7-swipeout-actions>
            </f7-list-item>

        </f7-list>
    </f7-page>
</template>

<script>
import firebase from 'firebase'
import defaultAvatar from '@/assets/defaultAvatar.png'

export default {
    computed: {
        contacts() {
            return this.$store.getters.contacts
        }
    },
    methods: {
        imgSrc(url) {
            return url || defaultAvatar
        },
        setDefaultImage(e) {
            e.target.src = defaultAvatar
        },
        addFriend(frd) {
            var request = {}
            const self = this
            request.sender = firebase.auth().currentUser.uid;
            request.recipient = frd.uid
            // console.log('request', request)
            self.$store.commit('setAlertMessage', 'Friend request sent!')
            this.$store.dispatch('sendRequest', request)
        },
    },
    created() {
        this.$store.dispatch('getAllUsers')
    }
}
</script>

<style scoped>
.small-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
}
</style>
