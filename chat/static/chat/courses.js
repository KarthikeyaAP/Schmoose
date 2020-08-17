const list=document.querySelector('ul');
const form=document.querySelector('form');
const message=document.querySelector('#message');
const user=document.querySelector('#user');
const anom=document.querySelector('#anom');


const formatTime=(timestamp)=>{
    dateObj=timestamp.toDate();
            utcString = dateObj.toLocaleString(); 
            const date=new Date();
            ago=(date-dateObj)/60000;
            time = utcString.slice(0,22);
            return ago;
}

const addMessage=(data,id)=>{
    const html=`
    <li data-id=${id}>
    <strong>${data.username}</strong>
    <span>${data.message}</span><br>
    <span class="time">Posted ${formatTime(data.created_at).toFixed(0)} minutes ago</span>
    </li>
`
list.innerHTML+=html;
}

db.collection('courses').onSnapshot(snapshot =>{
    snapshot.docChanges().forEach(change =>{
        const doc=change.doc;
        if(change.type == 'added'){
            addMessage(doc.data(),doc.id);
        }
    })
})

form.addEventListener('submit',e=>{
    e.preventDefault();

    const now=new Date();
    const username=anom.checked?'anonymous':user.value;
    const chat=message.value;
    const created_at=firebase.firestore.Timestamp.fromDate(now);
    const obj={
        'message':chat,
        'username':username,
        'created_at':created_at
    }
    db.collection('courses').add(obj);
    form.reset();
});

