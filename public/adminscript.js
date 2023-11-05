const { response } = require("express");

function showImages() {

    const imageInput= document.getElementById('imageInput');
    const imagepreview = document.getElementById('imagepreview');
    document.getElementById('imagepreview').innerHTML=null;
    const selectedimage = imageInput.files
    for(let i = 0; i<selectedimage.length;i++){

        const image = document.createElement('img');
        image.src = URL.createObjectURL(selectedimage[i])
        image.style.width="150px";
        image.style.margin="3px";
        image.style.height="100px"
        imagepreview.appendChild(image)
    }

 
} 
function deletePost(postId){
console.log(postId);
fetch('/admin/deletePost',{
    method:'delete',
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({postId:postId})
}).then((res)=> res.json())
.then((resp)=>{
if(resp.delete){
    location.reload()
}
else{
    alert("somethiing went wrong")
}
})
}