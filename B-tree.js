function  BTreeNode(t,leaf){
        this.t= t;
        this.leaf = leaf;
        this.keys =new Array(2*this.t-1);
        this.C = new Array(2*this.t);
        this.n = 0;
        this.pos =new Point(0,0);



        this.draw = function(pos){
            // console.log("drawing at "+ pos);
            var BTnode = new Path.Rectangle(pos,[50,100]);
            // BTnode.fillColor= "black";
            for(var i=0;i<this.keys.length&&this.keys[i]!=undefined;i++){
                // console.log("here"+ i);

                var text = new PointText(new Point(i*50,100)+this.pos);
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
            this.root.pos = new Point(view.center.x,50);
        }
        else{
            if(this.root.n==2*this.t-1){
                var s = new BTreeNode(this.t,false);
                s.C[0]= this.root;
                s.splitChild(0,this.root);

                var i =0;
                if(s.keys[0]<k){
                    i++;
                }
                s.C[i].insertNonFull(k);
                this.root = s;
            }
            else{
                console.log(this.root);
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

t= new BTree(3); // A B-Tree with minium degree 3 
var n=0; 
function reload(){
    n=0;
    project.activeLayer.removeChildren();
    console.log("From reload root",t.root);
    if(t.root!=null){
        Draw(t.root);
    }
}

// this.search = function(k){
//     var i=0;
//     while(i<this.n && k>this.keys[i]){
//         i++;
//     }
//     if(this.keys[i]==k){
//         return this;        //flagged
//     }
//     if(this.leaf ==true){
//         return null;
//     }
//     return this.C[i].search(k);
// }
function Draw(tree){
    console.log("In Draw n=",n,tree)
    if(!tree.leaf){
        tree.draw(new Point(100,n*20));
        n+=1;
        for(var i=0;i<tree.n;i++){
            Draw(tree.C[i]);
        }
    }
    else{
        tree.draw(new Point(100,n*20));
        n+=1;
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