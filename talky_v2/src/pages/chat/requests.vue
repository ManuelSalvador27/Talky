<template>
<f7-page name="about">
    <f7-navbar title="Requests" back-link="Back"></f7-navbar>
    <f7-block-title>Friend requests</f7-block-title>
    <f7-list media-list>
        <f7-list-item swipeout v-for="(request, index) in friend_requests" :key="index" :title="request.name">
            <img class="small-avatar" slot="media" :src="request.photo_url" />
            <f7-swipeout-actions right>
                <f7-swipeout-button color="green" @click="confirm(request)">Add</f7-swipeout-button>
                <f7-swipeout-button color="red" @click="remove(request)">Delete</f7-swipeout-button>
            </f7-swipeout-actions>
        </f7-list-item>

    </f7-list>
</f7-page>
</template>

<script>
export default {
    methods: {
        confirm(request) {
            this.$store.dispatch('confirmRequest', request)
        },
        remove(request) {
            this.$store.dispatch('deleteRequest', request)
        }
    },
    computed: {
        friend_requests() {
            return this.$store.getters.friend_requests
        }
    },
    created() {
        this.$store.dispatch('getMyRequests')
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
