const list=document.querySelector('ul');
const form=document.querySelector('form');
const message=document.querySelector('#message');
const user=document.querySelector('#user');
const anom=document.querySelector('#anom');

const Class=new Chat('courses');

db.collection('courses').onSnapshot(snapshot =>{
    snapshot.docChanges().forEach(change =>{
        const doc=change.doc;
        if(change.type == 'added'){
            const html=Class.addMessage(doc.data(),doc.id);
            list.innerHTML+=html;
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
    Class.addToDb(obj);
    form.reset();
});

