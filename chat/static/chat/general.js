const list=document.querySelector('ul');
const Submit=document.querySelector('form');
const message=document.querySelector('#message');
const user=document.querySelector('#user');
const anom=document.querySelector('#anom');




const Class= new Chat('General');

db.collection('General').onSnapshot(snapshot =>{
    snapshot.docChanges().forEach(change =>{
        const doc=change.doc;
        if(change.type == 'added'){
            const html= Class.addMessage(doc.data(),doc.id);
            list.innerHTML+=html
        }
    })
})

Submit.addEventListener('submit',e=>{
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

