const list=document.querySelector('ul');
const form=document.querySelector('form');
const message=document.querySelector('#message');
const user=document.querySelector('#user');
const anom=document.querySelector('#anom');


const formatTime=(timestamp)=>{
    dateObj=timestamp.toDate();
            utcString = dateObj.toLocaleString(); 
            const date=new Date();
            let diff=date-dateObj;
            if(diff/60000 <60){
            ago=(date-dateObj)/60000;
            timeName='minutes';
            }
            else if((diff/60000>=60) && (diff/60000<1440)){
                ago=diff/3600000;
                timeName='hours'
            }
            else if(diff/60000 >=1440){
                ago=diff/86400000;
                timeName='days'
            }
            time = utcString.slice(0,22);
            return {ago,
                timeName};
}

const addMessage=(data,id)=>{
    const html=`
    <li data-id=${id}>
    <strong>${data.username}</strong>
    <span>${data.message}</span><br>
    <span class="time">Posted ${formatTime(data.created_at).ago.toFixed(0)} ${formatTime(data.created_at).timeName} ago</span>
    </li>
`
list.innerHTML+=html;
}

db.collection('General').onSnapshot(snapshot =>{
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
    try{
        db.collection('General').add(obj);
        console.log('added successfully')
    }
    catch{
        console.log('error');
    }

    form.reset();
});

