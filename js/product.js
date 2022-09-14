class item{
    discount;
    image;
    name;
    vote;
    price;
    cata;
    quanlity;
    total

    constructor(discount,image,name,vote,price,cata,quanlity,total){
        this.discount=discount;
        this.image=image;
        this.name=name;
        this.vote=vote;
        this.price=price;
        this.cata=cata;
        this.quanlity=quanlity;
        this.total=total;
    }
    getprice(){
        return this.quanlity*this.price;
    }
}