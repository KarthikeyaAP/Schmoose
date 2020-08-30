
class Chat{
    constructor(group){
        this.group=group;
    }
    formatTime=(timestamp)=>{
        const dateObj=timestamp.toDate();
                const date=new Date();
                let ago=0
                let timeName=null;
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
                return {ago,
                    timeName};
    }
    addMessage=(data,id)=>{
        const html=`
        <li data-id=${id}>
        <strong>${data.username}</strong>
        <span>${data.message}</span><br>
        <span class="time">Posted ${this.formatTime(data.created_at).ago.toFixed(0)} ${this.formatTime(data.created_at).timeName} ago</span>
        </li>
    `   
    return html;
    }

    async addToDb(obj){
        try{
            await db.collection(this.group).add(obj).then(()=> console.log('added successfully'));
        }
        catch{
            console.log('an error occurred');
        }
    }
}



