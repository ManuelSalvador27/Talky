import firebase from 'firebase';

const FileModule = {
    state:{
        image_url: 'https://img.icons8.com/?size=100&id=2952&format=png&color=000000',
        files:null,
        images:[],
        group_image_url:'https://firebasestorage.googleapis.com/v0/b/talky-4c8cf.appspot.com/o/group_profile%2Fgroup%20icon.jpg?alt=media&token=2a2ef2b7-31fb-4677-a1d6-664c48791542'
    },
    getters:{
        image_url:state=>state.image_url,
        files:state=>state.files,
        images:state=>state.images,
        group_image_url:state=>state.group_image_url,
    },
    mutations:{
        setImageURL(state,payload){
            state.image_url = payload
        },
        setGroupImageURL(state,payload){
            state.group_image_url = payload
        },
        setFiles(state,payload){
            state.files = payload
        },
        setImages(state,payload){
            state.images = payload
        },
        
    },
    actions:{
        readFileMessage({commit}){
            const files = event.target.files;
            for (let i = 0; i < files.length; i++) {
                var file=files[i]
                if (!file.type.match("image")) {
                    continue;
                }
                var picReader = new FileReader();
                var images =[]
                picReader.addEventListener('load',event =>{
                    var picFile = event.target;
                    images.push(picFile.result)
                });
                commit('setImages',images)
                picReader.readAsDataURL(file)
                
            }
        },
        readFile({commit},action_name){
            const files = event.target.files;
            commit('setFiles',files)
            const fileReader = new FileReader();
            let file = files[0]
            if (file['size']<200000) {
                fileReader.readAsDataURL(file)
                fileReader.addEventListener('load',()=>{
                    var imageUrl = fileReader.result;
                    commit(action_name,imageUrl)
                })
            } else {
                commit('setAlertMessage','The image size is greater than 200KB')
                return
            }

        },
        uploadFile({commit,state},filepath){
            return new Promise((resolve,reject)=>{
                var file = state.files[0]
                var storageRef = firebase.storage().ref(filepath+file.name)
                var uploadTask = storageRef.put(file)
                
                uploadTask.on('state_changed', function(snapshot){
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                 
                  }, function(error) {
                    // Handle unsuccessful uploads
                    reject(error)
                  }, function() {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                      resolve(downloadURL)
                    });
                  });
            })
        },
        uploadChatImages({commit},payload){
            return new Promise((resolve,reject)=>{
                var number = Math.random()
                var uniq_id = number.toString(36).substr(2,9);
                var storageRef = firebase.storage().ref('chat_images/'+`${uniq_id}.png`)
                var uploadTask = storageRef.putString(payload,'data_url',{
                    contentType:"image/png"
                })
                
                uploadTask.on('state_changed', function(snapshot){
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                 
                  }, function(error) {
                    // Handle unsuccessful uploads
                    reject(error)
                  }, function() {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                      resolve(downloadURL)
                    });
                  });
            })
        }

    }

}
export default FileModule