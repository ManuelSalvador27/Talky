<template>
<f7-page name="signin">
    <f7-navbar title="Sign in"></f7-navbar>

    <f7-list no-hairlines-md>
        <f7-list-input :value="email" @input="email=$event.target.value" label="E-mail" type="email" placeholder="Your e-mail" clear-button>

        </f7-list-input>

        <f7-list-input :value="password" @input="password=$event.target.value" label="Password" type="password" placeholder="Your password" clear-button>

        </f7-list-input>

    </f7-list>
    <f7-block>
        <f7-button outline @click="signIn">Sign in</f7-button>
        <br>
        <div style="text-align:center;">
            <f7-link v-if="show_resend_email" @click="resendEmail" :color="color(time_left)">Resend Confirmation Email<span v-if="time_left>0">&nbsp; {{time_left}}</span></f7-link><br>
            <f7-link href="/signup/">Don't have an account? Sign up</f7-link><br>
            <f7-link @click="forgetPassword">Forget Password</f7-link>

        </div>
    </f7-block>
</f7-page>
</template>

<script>
import {
    setInterval,
    clearInterval
} from 'timers';
import {
    mixin
} from '../../js/mixin'
import firebase from 'firebase'
export default {
    data() {
        return {
            email: null,
            password: null,
            time_left: -1
        }
    },
    mixins: [mixin],
    computed: {
        show_resend_email() {
            return this.$store.getters.show_resend_email
        }
    },
    methods: {
        forgetPassword() {
            console.log('forgetPassword')
            const self = this
            var auth = firebase.auth();
            if (this.email != null) {
                auth.sendPasswordResetEmail(this.email).then(function () {
                    // Email sent.
                    self.$store.commit('setAlertMessage', 'An reset email has been sent')
                }).catch(function (error) {
                    self.$store.commit('setAlertMessage', error)
                });
            } else {
                self.$store.commit('setAlertMessage', 'Please enter your email')

            }

        },
        color(timeleft) {
            if (timeleft <= 0) {
                return '#007aff'
            } else {
                return 'gray'
            }

        },
        resendEmail() {
            const self = this
            console.log(self.time_left)
            if (this.time_left <= 0) {
                console.log('trigger resend')
                self.$store.dispatch('sendVerification')
                self.countDown()
            }

        },
        countDown() {
            const self = this
            self.time_left = 20
            var timer = setInterval(function () {
                self.time_left -= 1
                console.log('time left', self.time_left)
                if (self.time_left <= 0) {
                    clearInterval(timer)
                }
            }, 1000)
        },
        signIn() {
            console.log('signin')
            // this.showToastBottom('show toast')
            var payload = {}
            payload.email = this.email
            payload.password = this.password
            this.$store.dispatch('signIn', payload)
        }
    }
}
</script>
