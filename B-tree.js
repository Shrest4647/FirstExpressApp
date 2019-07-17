function  BTreeNode(t,leaf){
        this.t= t;
        this.leaf = leaf;
        this.keys =new Array(2*this.t-1);
        this.C = new Array(2*this.t);
        this.n = 0;

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
                splitChild(i+1,this.C[i+1]);
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

    
};


t= new BTree(3); // A B-Tree with minium degree 3 
t.insert(10); 
t.insert(20); 
t.insert(5); 
t.insert(6); 
t.insert(12); 
t.insert(30); 
t.insert(7); 
t.insert(17); 

console.log("Traversal of the constucted tree is "); 
t.traverse(); 

var k = 6; 
console.log((t.search(k) != null)? "\nPresent" : "\nNot Present"); 

k = 15; 
console.log((t.search(k) != null)? "\nPresent" : "\nNot Present"); 
