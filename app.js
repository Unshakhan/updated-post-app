let container = document.getElementById('container')
toggle = () => {
    container.classList.toggle('sign-in')
    container.classList.toggle('sign-up')
}

setTimeout(() => {
    container.classList.add('sign-in')
}, 200)

function render() {
    var name = document.getElementById("name").value
    var email = document.getElementById("email").value
    var pswrd = document.getElementById("pswrd").value
    var cpswrd = document.getElementById("cpswrd").value
    // console.log(name);


    var data = {
        name,
        email,
        pswrd,
        cpswrd
    }

    if (!name) {
        alert("Name is required")
    } else if (pswrd !== cpswrd) {
        alert("Passwords should be identical")
    } else if (!email) {
        alert("email is required")
    } else if (!pswrd) {
        alert("password is required")
    } else if (!cpswrd) {
        alert("confirm password is required")
    } else {
        localStorage.setItem("data", JSON.stringify(data))
        alert(name + " Registered Successfully")
        window.location.href = "/post.html"
        //  toggle()
    }
    console.log(pswrd);
}

function renderData() {
    var getData = JSON.parse(localStorage.getItem("data"))
    console.log(getData);

}

// post card
selectedImage = ""
function selectAvatar(img) {

    let allImages = document.getElementsByClassName("avatar-img");
    // console.log(allImages);

    for (let i = 0; i < allImages.length; i++) {
        allImages[i].style.border = "1px solid #dee2e6";
    }

    img.style.border = "3px solid #0d6efd";

    selectedImage = img.src;
    let nav = document.getElementById("mainNav");
    let brand = document.getElementById("navBrand");
    let btn = document.getElementById("savebtn")

    // ✅ SIMPLE IF–ELSE THEMES
    if (img.id === "bg1") {
        nav.style.background = "#57495ea8";   // dark blue 
        nav.style.color = "white";
        brand.style.color = "white";
        btn.style.background = "#57495ea8"
    } else if (img.id === "bg2") {
        nav.style.background = `radial-gradient(circle, rgba(194,31,2,1) 0%, rgba(199,133,26,1) 51%, rgba(195,58,10,1) 100%)`;
        nav.style.color = "white";
        brand.style.color = "white";
        btn.style.background = `radial-gradient(circle, rgba(194,31,2,1) 0%, rgba(199,133,26,1) 51%, rgba(195,58,10,1) 100%)`
    } else if (img.id === "bg3") {
        nav.style.background = "#7e8a66";   // purple
        nav.style.color = "white";
        brand.style.color = "white";
        btn.style.background = "#7e8a66"

    } else if (img.id === "bg4") {
        nav.style.background = "#7f9962";   // light grey
        nav.style.color = "black";
        brand.style.color = "black";
        btn.style.background = "#7f9962"

    }
}

// function deletePost(button) {
//     // button = clicked delete button
//     let card = button.closest(".card"); //Jis element par use kiya ho (button)

//     //Uske parents / grandparents / great-grandparents tak nearest card div find karega
//     card.remove(); // pura card delete
// }


// function createPost() {

//     let topic = document.getElementById("topicInput").value;
//     let comment = document.getElementById("commentInput").value;

//     // let firstName = document.getElementById("floatingFirstName").value;
//     // let lastName = document.getElementById("floatingLastName").value;
//     var getData = JSON.parse(localStorage.getItem("data"))
     

//   var postInfo = {
//     topic,
//     comment
//   }
//   localStorage.setItem("postInfo" ,JSON.stringify(postInfo))
//    var getpostInfo = JSON.parse(localStorage.getItem("postInfo"))
//     console.log(getpostInfo.topic);
//     let time = new Date().toLocaleString();//it return readable time 

//     if (selectedImage === "") {
//         alert("Please select a background image!");
//         return;
//     }

//     let postHTML = `
//         <div class="card shadow mb-4 p-0" style="background-image:url('${selectedImage}'); background-size:cover;">
//             <div class="p-4" style="backdrop-filter: brightness(0.8);">

//                 <div class="d-flex mb-3">

//                     <div class="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
//                          style="width:50px; height:50px; font-size:20px;">
//                         ${getData.name.charAt(0).toUpperCase()}
//                     </div>

//                     <div class="ms-3">
//                         <h5 class="mb-0">${getData.name}</h5>
//                         <small class="text-light">${time}</small>
//                     </div>
//                 </div>

//                 <h4>${getpostInfo.topic}</h4>
//                 <p>${getpostInfo.comment}</p>
//                 <div class="d-flex justify-content-start mt-5 align-items-end"><i class="fa-solid fa-comment cmnt" onclick="cmntBox()"></i></div>
//                  <div class="mt-3 d-flex gap-2 justify-content-end">
//                     <button class="btn btn-warning btn-sm" onclick="editPost(this)">Edit</button>
//                     <button class="btn btn-danger btn-sm" onclick="deletePost(this)">Delete</button>
//                 </div>
//                  <div class="commentDiv" id="commentdiv"  gap-2 justify-content-end px-2">
//                    <input type="text" id="usercmnt" class="form-control" placeholder ="Write anything .....">
               
//                <i class="fa-solid fa-paper-plane  m-auto pe-4" id="paperplane" onclick = "send()"></i>
//                 </div>
                  
//             </div>
//         </div>
//     `;

//     document.getElementById("postContainer").innerHTML += postHTML;

// }
function createPost() {

    let topic = document.getElementById("topicInput").value;
    let comment = document.getElementById("commentInput").value;
    let getData = JSON.parse(localStorage.getItem("data"));
    let time = new Date().toLocaleString();

    // 🔹 FIRST: Edit Mode Check — NOW topic/comment exist!
    if (editId !== null) {

        let posts = JSON.parse(localStorage.getItem("posts"));
        let index = posts.findIndex(p => p.id === editId);

        posts[index].topic = topic;
        posts[index].comment = comment;

        // Only update background if user selected new one
        if (selectedImage) {
            posts[index].bg = selectedImage;
        }

        localStorage.setItem("posts", JSON.stringify(posts));

        editId = null;
        displayPosts();

        document.getElementById("topicInput").value = "";
        document.getElementById("commentInput").value = "";

        return;
    }

    // 🔹 Normal Post Create
    if (!selectedImage) {
        alert("Please select a background image!");
        return;
    }

    let post = {
        id: Date.now(),
        name: getData.name,
        topic,
        comment,
        time,
        bg: selectedImage
    };

    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.push(post);

    localStorage.setItem("posts", JSON.stringify(posts));

    displayPosts();

    document.getElementById("topicInput").value = "";
    document.getElementById("commentInput").value = "";
}

function logout() {
    window.location.href = "/"
}
function signIn() {

    var username = document.getElementById("username").value
    var userpswrd = document.getElementById("userpswrd").value
    var getData = JSON.parse(localStorage.getItem("data"))
    // console.log(username,userpswrd);
    // var loginData = {
    //     username,
    //     userpswrd
    // }
    if (getData.name !== username) {
        alert("invalid username")
    } else if (getData.pswrd !== userpswrd) {
        alert("Invalid password")
    } else if (!username) {
        alert("plz enter username")
    } else if (!userpswrd) {
        alert("plz enter password")
    } else {
        window.location.href = "/post.html"
    }
    console.log(pswrd);
}
// function editPost() {
//     var card = event.target.parentNode.parentNode;
//     var main = event.target.parentNode.parentNode.parentNode
//     //   console.log(card);

//     var title = card.childNodes[3].innerHTML
//     //   console.log(title);

//     var description = card.childNodes[5].innerHTML;
//     console.log(description);

//     document.getElementById("topicInput").value = title;
//     document.getElementById("commentInput").value = description;
//     main.remove()
// }
function cmntBox() {
    var commentDiv = document.getElementById("commentdiv");

    if (commentDiv.style.display === "flex") {
        commentDiv.style.display = "none";
    } else {
        commentDiv.style.display = "flex";
    }
}

function send() {
    var usercmnt = document.getElementById("usercmnt").value
    //  console.log(usercmnt);
    var commentDiv = document.getElementById("commentdiv")
    commentDiv.innerHTML += `
		<div id="cmntvalue" style="width: 100%;" class = "my-2" id="cmntValue"><p class="text-start p-2" id="cmntpara" style="width: 100%;" >${usercmnt} </p><i class="fa-solid fa-pen-to-square" id="editcmnt" onclick ="editcmnt()"></i> <i class="fa-solid fa-thumbs-up pe-0" id="thumb" onclick ="changeColor(this)"></i> <i class="fa-solid fa-x" id="cross" onclick="remove(this)"></i>  </div>
`
}
function remove() {
    var cmntdiv = event.target.parentNode.remove()
    // console.log(cmntdiv);

}
function editcmnt() {
    var cmntdiv = event.target.parentNode
    // console.log(cmntdiv.childNodes);
    var cmnt = cmntdiv.childNodes[0].innerHTML;
    var userinput = document.getElementById("usercmnt").value = cmnt;
    console.log(cmnt);
    cmntdiv.remove()
}
function changeColor(){
var thumbsicon = event.target.style.color="blue"
// console.log(thumbsicon);

}

function displayPosts() {
    let container = document.getElementById("postContainer");
    container.innerHTML = "";

    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    posts.forEach(post => {
        container.innerHTML += `
        <div class="card shadow mb-4 p-0" style="background-image:url('${post.bg}'); background-size:cover;">
            <div class="p-4" style="backdrop-filter: brightness(0.8);">

                <div class="d-flex mb-3">
                    <div class="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
                         style="width:50px; height:50px; font-size:20px;">
                        ${post.name.charAt(0).toUpperCase()}
                    </div>

                    <div class="ms-3">
                        <h5 class="mb-0">${post.name}</h5>
                        <small class="text-light">${post.time}</small>
                    </div>
                </div>

                <h4>${post.topic}</h4>
                <p>${post.comment}</p>

                <div class="d-flex justify-content-start mt-5 align-items-end">
                    <i class="fa-solid fa-comment cmnt" onclick="cmntBox()"></i>
                </div>

                <div class="mt-3 d-flex gap-2 justify-content-end">
                    <button class="btn btn-warning btn-sm" onclick="editPost(${post.id})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deletePost(${post.id})">Delete</button>
                </div>

                <div class="commentDiv" id="commentdiv">
                    <input type="text" id="usercmnt" class="form-control" placeholder ="Write anything .....">
                    <i class="fa-solid fa-paper-plane m-auto pe-4" onclick="send()"></i>
                </div>

            </div>
        </div>
        `;
    });
}

function deletePost(id) {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    let updated = posts.filter(p => p.id !== id);

    localStorage.setItem("posts", JSON.stringify(updated));

    displayPosts();
}
let editId = null;

function editPost(id) {
    let posts = JSON.parse(localStorage.getItem("posts"));

    let post = posts.find(p => p.id === id);

    document.getElementById("topicInput").value = post.topic;
    document.getElementById("commentInput").value = post.comment;

    editId = id;  // store id for update
}
