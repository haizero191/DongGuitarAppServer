class FileUpload {
    upload(auth, fileName, ) {
        return new Promise((resolve,rejected)=>{
            const drive = google.drive({version:'v3',auth:authClient}); 
            var fileMetaData = {
                name:'image.jpeg',    
                parents:['1z9Uh2LaMxPQpuqXZfSwChSx9rOf0Ry2F'] // A folder ID to which file will get uploaded
            }
            drive.files.create({
                resource:fileMetaData,
                media:{
                    body: fs.createReadStream('image.jpeg')// files that will get uploaded
                },
                fields:'id'
            },function(error,file){
                if(error){
                    return rejected(error)
                }
                resolve(file);
            })
        });
    }
}


module.exports = new FileUpload()