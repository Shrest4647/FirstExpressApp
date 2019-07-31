function  BTreeNode(t,leaf,pos){
        this.t= t;
        this.leaf = leaf;
        this.keys =new Array(2*this.t-1);
        this.C = new Array(2*this.t);
        this.n = 0;
        if(pos==undefined){
            this.pos= new Point(view.center.x,50);
        }
        else{
            this.pos = pos;
        }

        this.draw = function(pos){
            // console.log("drawing at "+ pos);
            var BTnode = new Path.Rectangle(this.pos,[(this.n)*20,30]);
            BTnode.strokeColor= "black";
            for(var i=0;i<this.n;i++){
                // console.log("here"+ i);

                var text = new PointText(new Point(i*20,20)+this.pos);
                text.content = this.keys[i];
                text.fillColor = "red";
            }
        }

    this.traverse= function(){
        var i;
        for(i=0;i<this.n;i++)
        {
            if(this.leaf==false)
            {
                this.C[i].traverse();

            }
            console.log(this.keys[i]);
        }
        if(this.leaf==false)
        {
            this.C[i].traverse();
        }

    }

    this.search = function(k){
        var i=0;
        while(i<this.n && k>this.keys[i]){
            i++;
        }
        if(this.keys[i]==k){
            return this;        //flagged
        }
        if(this.leaf ==true){
            return null;
        }
        return this.C[i].search(k);
    }

    this.insertNonFull= function(k){
        var i = this.n-1;
        if(this.leaf ==true){
            while(i>=0 && this.keys[i]>k){
                this.keys[i+1] =this.keys[i];
                i--;
            }

            this.keys[i+1]=k;
            this.n++;


        }

        else{
            while(i>=0 && this.keys[i]>k){
                i--;
            }
            if(this.C[i+1].n===2*this.t-1){
                this.splitChild(i+1,this.C[i+1]);
                if(this.keys[i+1]<k){
                    i++;
                }
            }
            this.C[i+1].insertNonFull(k);
        }

    }

    this.splitChild = function(i,y){
        var z = new BTreeNode(y.t,y.leaf);
        z.n = this.t-1;

        for(var j =0;j<this.t-1;j++){
            z.keys[j]= y.keys[j+t];
        }
        if(y.leaf == false){
            for(var j=0;j<t;j++){
                z.C[j]= y.C[j+this.t];
            }
        }

        y.n= this.t-1;
        
        for(var j=this.n;j>=i+1;j--){
            this.C[j+1] = this.C[j];
        }

        this.C[i+1]=z;

        for(var j=this.n-1;j>=i;j--){
            this.keys[j+1]= this.keys[j];
        }

        this.keys[i] = y.keys[t-1];

        this.n++;
        
        z.pos= y.pos+new Point(z.n/2*20,50);
        y.pos= y.pos+new Point(-z.n*20,50);




    }


};


//Start of Btree 
function BTree(t){
        this.root = null;
        this.t = t;

    this.search = function(data){
        if(this.root==null){
            return null;
        }
        else{
            return this.root.search(data);
        }


    }
    this.traverse= function(){
        if(this.root!==null){
            this.root.traverse();
        }
    }

    this.insert= function(k){
        if(this.root ==null){
            this.root = new BTreeNode(this.t,true);
            this.root.keys[0]= k;
            this.root.n=1;
            // this.root.pos = new Point(view.center.x,50);
        }
        else{
            if(this.root.n==2*this.t-1){
                var s = new BTreeNode(this.t,false,this.root.pos);
                s.C[0]= this.root;
                s.splitChild(0,this.root);

                var i =0;
                if(s.keys[i]<k){
                    i++;
                }
                //Managing the space
                for(var k=0;k<s.n;k++){
                    s.C[k].pos=s.pos+new Point(-s.n*20+k*40,50);                                                                         
                }
                s.C[i].insertNonFull(k);
                this.root = s;
            }
            else{
                this.root.insertNonFull(k);
            }
            
        }

    }

    this.remove = function(k){
        if(!this.root){
            alert("the Tree is empty\n");
            return;
        }
        this.root.remove(k);

        if(this.root.n ===0){
            var tmp = root;
            if(this.root.leaf){
                this.root = null;

            }
             else{
                this.root = this.root.C[0];
            }
        return;
        }

    }


    
};
//End of Btree

t= new BTree(2); // A B-Tree with minium degree 3 
var n=0; 
var c = 0;
function reload(){
    n=0;
    c=0;
    project.activeLayer.removeChildren();
    console.log("From reload root",t.root);
    if(t.root!=null){
        Draw(t.root);
    }
}



// this.traverse= function(){
//     var i;
//     for(i=0;i<this.n;i++)
//     {
//         if(this.leaf==false)
//         {
//             this.C[i].traverse();

//         }
//         console.log(this.keys[i]);
//     }
//     if(this.leaf==false)
//     {
//         this.C[i].traverse();

function Draw(tree){
    console.log("In Draw n=",n,tree);
    // tree.draw(new Point(n*30+(c-2)*30+100,n*20));
    tree.draw(n);


    if(!tree.leaf){
        n+=1;
        c=0;
        for(var i=0;i<=tree.n;i++){
            c+=1;
            Draw(tree.C[i]);
        }
    
    }
    else{
        n-=1;
        console.log("returning from depth",n+1);
        }
}

var inp = document.querySelector('input');
inp.addEventListener("keypress",function(event){
    // console.log(event);
    if(event.keyCode == 13){
// console.log("hurah",inp.value);
        t.insert(parseInt(inp.value));
        inp.value = parseInt(inp.value)+1;
        reload();

    }

});