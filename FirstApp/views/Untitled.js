class Node{
    constructor(data,next = null,pos =null)
    {
        this.data= data;
        this.next = next;
        this.pos = pos;
    }
}

class List{
    constructor()
    {
        this.head = null;
    }
    
    push(data){
        let newnode= new Node(data);
        newnode.next = this.head;
        this.head= newnode;
    }

    insertAtEnd(data){
        let newnode = new Node(data);
        if(!this.head)
        {
            this.head = newnode;
        }
        else{
            let temp = thid.head;
            while(temp.next!==null)
            {
                temp = temp.next;
            }
            temp.next = newnode;
        }
    }
    insertAt(data,pos){
        let newnode = new Node(data);
        if(!this.head){
            this.head = newnode;
        }
        else{
            let temp = this.head;
            for(let i=0;i<pos;i++)
            {
                temp = temp.next;
            }
            newnode.next = temp.next;
            temp.next = newnode;
        }

    }

    searchData(data){
        let temp = this.head;
        let prev = null;
        let flag  =0;
        for(var i=1;temp!=null,i++){
            if(temp.data==data){
                return i;
            }
        }
        return null;


    }

    pop(){
        if(this.head === null)
        {
            alert("Invalid Act: Underflow Occured");
            return;
        }
        if(this.head.next === null){
            var pop = this.head.data;
            this.head = null;
            return;
        }
        else{
            let prev = this.head;
            let tempnode = this.head.next;
            while(tempnode.next!=null)
            {
                prev = tempnode;
                tempnode=tempnode.next;
            }
            pop = tempnode.data;
            prev.next = null;
            alert(pop," is popped");

        }
    }

    dequeue(){
        if(!this.head){
            alert("Invalid : Underflow occured");
            return;
        }
        let data = this.head.data;
        this.head = this.head.next;
        alert(data ," is dequeued");
    }

    deleteData(data){

        if(!searchData(data)){
            alert(data ," Not Found");
        }
        else{
            let temp = this.head;
            let prev = null;
            if(temp.data = data)
            {
                this.head = temp.next;
                return;
            }
            while(temp.data!= data){
                prev = temp;
                temp = temp.next;
            }

        }

    }
}