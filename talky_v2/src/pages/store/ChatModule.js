import firebase from "firebase";
import  * as db from './db';
import moment from 'moment';
const ChatModule = {
  state: {
    contacts:[],
    friends:[],
    friend_requests:[],
    chat_messages:[]
  },
  getters: {
    contacts: state => state.contacts,
    friends: state => state.friends,
    friend_requests: state => state.friend_requests,
    chat_messages: state => state.chat_messages,

  },
  mutations: {
    setContacts(state, payload) {
      state.contacts = payload;
    },
    setFriends(state, payload) {
      state.friends = payload;
    },
    setFriendRequests(state, payload) {
      state.friend_requests = payload;
    },
    setChatMessages(state,payload){
      state.chat_messages = payload
    }
  },
  actions: {
    async sendLatestMessage({},payload){
      var user_id = firebase.auth().currentUser.uid
      var user_key = payload.userkey;
      var frd_id = payload.friend.uid;
      var frd_key = payload.friend.frd_key;
      var latest_message = '';
      console.log('sendLatestMessage',payload.img)
      if (payload.img!=null) {
        latest_message = 'photo'
      } else {
        latest_message = payload.msg
      }
      try {
        await db.firefriends.child(user_id)
        .child(frd_key)
        .update({
          latest_message:latest_message
        })
        await db.firefriends.child(frd_id)
        .child(user_key)
        .update({
          latest_message:latest_message
        })
        
      } catch (error) {
        
      }

    },
    getUserKey({},payload){
      var promise = new Promise((resolve,reject)=>{
        var frd_id = payload.friend.uid;
        db.firefriends.child(frd_id).orderByChild("uid")
        .equalTo(firebase.auth().currentUser.uid)
        .once('value',snapshot=>{
          let userkey;
          for(var key in snapshot.val()) userkey = key;
          resolve(userkey)

        })
        .catch(err=>{
          reject(err)
        })
      })
      return promise

    },
    getChatMessages({commit},payload){
      var current_user = firebase.auth().currentUser
      db.firechats.child(current_user.uid).child(payload.uid).on('value',snapshot=>{
        var messages = snapshot.val()
        _.forEach(messages, message=>{
          message.type = message.sentby == current_user.uid? 'sent':'received';
          message.name = message.sentby == current_user.uid? current_user.displayName:payload.name;
          message.avatar = message.sentby == current_user.uid? current_user.photoURL:payload.photo_url;
          message.date = moment(message.timestamp).format("MMMM Do dddd");
        })
        var groupedmessages = _.groupBy(messages, 'date')
        commit('setChatMessages',groupedmessages)
      })
    },
    async sendMessage({dispatch},payload){
      var userkey = await dispatch('getUserKey',payload)
      var frd_info = payload;
      frd_info.userkey = userkey
      dispatch('sendLatestMessage',frd_info)
      try {
        await db.firechats.child(firebase.auth().currentUser.uid)
        .child(payload.friend.uid)
        .push({
          sentby:firebase.auth().currentUser.uid,
          text:payload.msg,
          image:payload.img,
          timestamp:firebase.database.ServerValue.TIMESTAMP
        })

        await db.firechats.child(payload.friend.uid)
        .child(firebase.auth().currentUser.uid)
        .push({
          sentby:firebase.auth().currentUser.uid,
        text:payload.msg,
        image:payload.img,
        timestamp:firebase.database.ServerValue.TIMESTAMP
        })
      } catch (error) {
        console.log(error)
      }
     
    },
    confirmRequest({dispatch},payload){
      var promise = new Promise((resolve,reject)=>{
        db.firefriends.child(firebase.auth().currentUser.uid)
        .push({uid:payload.uid})
        .then(()=>{
          db.firefriends.child(payload.uid)
          .push({uid:firebase.auth().currentUser.uid})
        })
        .then(()=>{
          dispatch('deleteRequest',payload).then(()=>{
            resolve(true)
          })
        })
        .catch(err=>{
          reject(err)
        })
      })
      return promise
    },
    deleteRequest({},payload){
      var promise = new Promise((resolve,reject)=>{
        db.firerequest.child(firebase.auth().currentUser.uid)
        .orderByChild('sender')
        .equalTo(payload.uid)
        .once('value',snapshot=>{
          let userkey;
          for(var key in snapshot.val()) userkey = key
          db.firerequest.child(firebase.auth().currentUser.uid)
          .child(userkey)
          .remove()
          .then(()=>{
            resolve(true)
          })
          .catch(err=>{
            reject(err)
          })

        }).catch(err=>{
          reject(err)
        })
      })
      return promise
    },
    async getMyRequests({commit,dispatch}){
      var users = await dispatch('getAllUsers')
      db.firerequest.child(firebase.auth().currentUser.uid)
      .on('value',snapshot=>{
       
        var frd_request_id = _.map(snapshot.val(),"sender")
        var userdetails = []
        _.forEach(frd_request_id, uid=>{
          var user = _.find(users,["uid",uid])
          userdetails.push(user)
        })
        commit('setFriendRequests',userdetails)
      })
    },
    async getMyFriends({commit,dispatch}){
      var users = await dispatch('getAllUsers')
      db.firefriends.child(firebase.auth().currentUser.uid)
      .on('value',snapshot=>{     
        // var frds_id = _.map(snapshot.val(),"uid")
        var friends = snapshot.val()
        var userdetails = []
        _.forEach(friends,(frd,key)=>{
          var user = _.find(users,["uid",frd.uid])
          if (frd.latest_message) {
            user.latest_message = frd.latest_message
          } else {
            user.latest_message = ''
          }
          user.frd_key = key;
          userdetails.push(user)

        })
        console.log('user detais',userdetails)
        commit('setFriends',userdetails)
      })
    },
    getAllUsers({commit}){
      var promise = new Promise((resolve,reject)=>{
        firebase.database().ref('users').on('value',function(snapshot){
          console.log(snapshot.val())
          commit('setContacts',snapshot.val())
          resolve(snapshot.val())
        })
      })
      return promise
    },
    sendRequest({commit},payload){
      var promise = new Promise((resolve,reject)=>{
        db.firerequest.child(payload.recipient).push({sender:payload.sender})
        .then(()=>{
          resolve({success:true})
        })
        .catch(err=>{
          reject(err)
        })
      })
      return promise
    }
  }
};
export default ChatModule;
