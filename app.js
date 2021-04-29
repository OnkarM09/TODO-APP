
const todolist=document.getElementById('todo-list')
const form=document.getElementById('todo-form')
const updateBtn=document.getElementById('update')
let newTitle='';
let currentUser=null;
let updateId=null;
const logoutItems=document.querySelectorAll('.logged-out')
const loginItems=document.querySelectorAll('.logged-in')


function setupUI(user){
    if(user){
        loginItems.forEach(item=>item.style.display='block');
        logoutItems.forEach(item=>item.style.display='none');
    }else{
        loginItems.forEach(item=>item.style.display='none');
        logoutItems.forEach(item=>item.style.display='block');
    }
}

function renderList(doc){

    let li=document.createElement('li');
    li.className="collection-item";
    li.setAttribute('data-id',doc.id)
    let div=document.createElement('div');
    let title=document.createElement('span');
    title.textContent=doc.data().title;
    let anchor=document.createElement('a');
    anchor.href="#modal-edit";
    anchor.className="modal-trigger secondary-content";
    let editbtn=document.createElement('i');
    editbtn.className="material-icons";
    editbtn.innerText="edit";
    let deletebtn=document.createElement('i');
    deletebtn.className="material-icons secondary-content";
    deletebtn.innerText="delete";
    anchor.appendChild(editbtn);
    div.appendChild(title);
    div.appendChild(deletebtn);
    div.appendChild(anchor);
    li.appendChild(div);

    deletebtn.addEventListener('click',e=>{
        let id=e.target.parentElement.parentElement.getAttribute('data-id');
        // console.log(id)
        db.collection('todos').doc(id).delete();
    })
    editbtn.addEventListener('click',e=>{
        updateId=e.target.parentElement.parentElement.parentElement.getAttribute('data-id');
    })
    todolist.append(li);
}

form.addEventListener('submit',e=>{
    e.preventDefault();
    db.collection('todos').add({
        title:form.title.value
    })
    form.title.value='';
})
// console.log(document.getElementsByName('newtitle')[0])

updateBtn.addEventListener('click', e => {
    e.preventDefault();
    newTitle = document.getElementsByName('newtitle')[0].value;
    db.collection('todos').doc(updateId).update({
        title: newTitle
    })
})

function getTodos(){
    todolist.innerHTML='';
    currentUser=auth.currentUser;
    console.log('Current User:',currentUser)
    if(currentUser==null){
        todolist.innerHTML='<h3 class="center-align">Please Login To Continue</h3>';
        return;
    }
    db.collection('todos').orderBy('title').onSnapshot(snapshot=>{
        let changes=snapshot.docChanges()
        // console.log(changes)
        changes.forEach(change => {
            if(change.type=='added'){
                renderList(change.doc)
                // console.log(change.doc.data())
            }
            else if(change.type=='removed'){
                let li=todolist.querySelector(`[data-id=${change.doc.id}]`)
                todolist.removeChild(li)
                alert('Deleted Successfully!')
            }
            if(change.type=='modified'){
                let li = todolist.querySelector(`[data-id=${change.doc.id}]`);
                li.getElementsByTagName('span')[0].textContent = newTitle;
                newTitle = '';
            }
        });
    })
}