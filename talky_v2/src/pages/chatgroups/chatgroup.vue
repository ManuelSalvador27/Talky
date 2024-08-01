<template>
<f7-page>
    <f7-navbar title="Messages" back-link="Back">
        <f7-nav-right>
            <f7-link @click="$refs.groupOptions.open()">
                <i class="f7-icons">more_vertical</i>
            </f7-link>
        </f7-nav-right>

    </f7-navbar>
    <pre>{{group_messages}}</pre>
    <f7-actions v-if="user_uid == chatgroup.owner" ref="groupOptions">
        <f7-actions-group>
            <f7-actions-label>Group Options</f7-actions-label>
            <f7-actions-button @click="goto(`/addmembers/${chatgroup.name}`)">Add Members</f7-actions-button>
            <f7-actions-button @click="goto(`/groupmembers/${chatgroup.name}`)">Group Info</f7-actions-button>
            <f7-actions-button color="red">Delete Group</f7-actions-button>
        </f7-actions-group>
    </f7-actions>
    <f7-actions v-else ref="groupOptions">
        <f7-actions-group>
            <f7-actions-label>Group Options</f7-actions-label>
            <f7-actions-button @click="leaveGroup">Leave this group</f7-actions-button>
            <f7-actions-button @click="goto(`/groupinfo/${chatgroup.name}`)">Group Info</f7-actions-button>

        </f7-actions-group>
    </f7-actions>
    <f7-messagebar :placeholder="placeholder" ref="messagebar" :attachments-visible="attachmentsVisible" :sheet-visible="sheetVisible">
        <f7-link icon-ios="f7:folder" icon-aurora="f7:folder" icon-md="material:folder" slot="inner-start" @click="launchFilePicker"></f7-link>
        <f7-link icon-ios="f7:camera_fill" icon-aurora="f7:camera_fill" icon-md="material:camera_alt" slot="inner-start" @click="sheetVisible = !sheetVisible"></f7-link>
        <f7-link icon-ios="f7:arrow_up_fill" icon-aurora="f7:arrow_up_fill" icon-md="material:send" slot="inner-end" @click="sendMessage"></f7-link>
        <f7-messagebar-attachments>
            <f7-messagebar-attachment v-for="(image, index) in attachments" :key="index" :image="image" @attachment:delete="deleteAttachment(image)"></f7-messagebar-attachment>
        </f7-messagebar-attachments>
        <f7-messagebar-sheet>
            <f7-messagebar-sheet-image v-for="(image, index) in images" :key="index" :image="image" :checked="attachments.indexOf(image) >= 0" @change="handleAttachment"></f7-messagebar-sheet-image>
        </f7-messagebar-sheet>
    </f7-messagebar>

    <f7-messages ref="messages">
        <f7-messages-title><b>Sunday, Feb 9,</b> 12:58</f7-messages-title>
        <f7-message v-for="(message, index) in group_messages" :key="index" :type="message.type" :image="message.image" :name="message.displayName" :avatar="message.avatar" :first="isFirstMessage(message, index)" :last="isLastMessage(message, index)" :tail="isTailMessage(message, index)">
            <span slot="text" v-if="message.text" v-html="message.text"></span>
        </f7-message>
        <f7-message v-if="typingMessage" type="received" :typing="true" :first="true" :last="true" :tail="true" :header="`${typingMessage.name} is typing`" :avatar="typingMessage.avatar"></f7-message>
    </f7-messages>
    <input type="file" ref="file" style="display:none;" @change="onFilePicked" multiple>
</f7-page>
</template>

<script>
import firebase from 'firebase'
export default {
    data() {
        return {
            user_uid: null,
            chatgroup: null,
            attachments: [],
            sheetVisible: false,
            typingMessage: null,
            messagesData: [],
            responseInProgress: false,
        };
    },
    computed: {
        group_messages() {
            return this.$store.getters.group_messages
        },
        images() {
            return this.$store.getters.images
        },
        attachmentsVisible() {
            const self = this;
            return self.attachments.length > 0;
        },
        placeholder() {
            const self = this;
            return self.attachments.length > 0 ? 'Add comment or Send' : 'Message';
        },
    },
    mounted() {
        const self = this;
        self.$f7ready(() => {
            self.messagebar = self.$refs.messagebar.f7Messagebar;
            self.messages = self.$refs.messages.f7Messages;
        });
    },
    methods: {
        launchFilePicker() {
            this.$refs.file.click()
        },
        onFilePicked() {
            this.$store.dispatch('readFileMessage')
        },

        leaveGroup() {
            var payload = {}
            payload.group_name = this.chatgroup.name
            this.$store.dispatch('leaveGroup', payload)
        },
        goto(page) {
            console.log('pagep', page)
            this.$f7router.navigate(page)
        },
        isFirstMessage(message, index) {
            const self = this;
            const previousMessage = self.messagesData[index - 1];
            if (message.isTitle) return false;
            if (!previousMessage || previousMessage.type !== message.type || previousMessage.name !== message.name) return true;
            return false;
        },
        isLastMessage(message, index) {
            const self = this;
            const nextMessage = self.messagesData[index + 1];
            if (message.isTitle) return false;
            if (!nextMessage || nextMessage.type !== message.type || nextMessage.name !== message.name) return true;
            return false;
        },
        isTailMessage(message, index) {
            const self = this;
            const nextMessage = self.messagesData[index + 1];
            if (message.isTitle) return false;
            if (!nextMessage || nextMessage.type !== message.type || nextMessage.name !== message.name) return true;
            return false;
        },
        deleteAttachment(image) {
            const self = this;
            const index = self.attachments.indexOf(image);
            self.attachments.splice(index, 1)[0]; // eslint-disable-line
        },
        handleAttachment(e) {
            const self = this;
            const index = self.$(e.target).parents('label.checkbox').index();
            const image = self.images[index];
            if (e.target.checked) {
                // Add to attachments
                self.attachments.unshift(image);
            } else {
                // Remove from attachments
                self.attachments.splice(self.attachments.indexOf(image), 1);
            }
        },
        sendMessage() {
            const self = this;
            const text = self.messagebar.getValue().replace(/\n/g, '<br>').trim();
            const messagesToSend = [];
            self.attachments.forEach((attachment) => {
                messagesToSend.push({
                    image: attachment,
                });
            });
            if (text.trim().length) {
                messagesToSend.push({
                    text,
                });
            }
            if (messagesToSend.length === 0) {
                return;
            }

            if (self.attachments.length > 0) {
                _.forEach(self.attachments, attachment => {
                    self.$store.dispatch('uploadChatImages', attachment).then(url => {
                        var payload = {
                            group_name: self.chatgroup.name,
                            message: text,
                            img: url
                        }
                        self.$store.dispatch('sendGroupMessage', payload)
                        self.$store.dispatch('sendLatestGroupMessage', payload)
                    })
                })
            } else {
                var payload = {
                    group_name: self.chatgroup.name,
                    message: text,
                    img: null
                }
                self.$store.dispatch('sendGroupMessage', payload)
                self.$store.dispatch('sendLatestGroupMessage', payload)

            }

            // Reset attachments
            self.attachments = [];
            // Hide sheet
            self.sheetVisible = false;
            // Clear area
            self.messagebar.clear();
            // Focus area
            if (text.length) self.messagebar.focus();

        },
    },
    created() {
        this.user_uid = firebase.auth().currentUser.uid
        let param = decodeURIComponent(this.$f7route.params.group)
        this.chatgroup = JSON.parse(param)
        this.$store.commit('setShowTabs', false)
        this.$store.dispatch('getGroupMessages', this.chatgroup.name)
    }
};
</script>
