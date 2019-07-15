class BTreeNode{
    constructor(t,leaf){
        this.t= t;
        this.leaf = leaf;
        this.keys =[];
        this.Child = [];
        this.n = 0;

    }
    traverse(){
        for(var i=0;i<this.n;i++)
        {
            if(this.leaf==false)
            {
                this.Child[i].traverse();

            }
            console.log(this.keys[i]);
        }
        if(this.leaf==false)
        {
            this.Child[i].traverse();
        }

    }

    search(int k){
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
        return this.Child[i].search(k);
    }

}

class BTree{
    constructor(t){
        this.root = null;
        this.t = t;
    }
    search(data,){
        if(this.root==null){
            return null;
        }
        else{
            return this.root.traverse();
        }


    }
    traverse(){
        if(this.root!==null){
            this.root.traverse();
        }
    }
}