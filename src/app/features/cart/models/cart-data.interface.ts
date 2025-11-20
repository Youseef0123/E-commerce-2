
   
    export interface CartData {
        _id:            string;
        cartOwner:      string;
        products:       ProductElement[];
        createdAt:      Date;
        updatedAt:      Date;
        __v:            number;
        totalCartPrice: number;
    }
    
    export interface ProductElement {
        count:   number;
        _id:     string;
        product: ProductProduct;
        price:   number;
    }
    
    export interface ProductProduct {
        subcategory:    Brand[];
        _id:            string;
        title:          string;
        quantity:       number;
        imageCover:     string;
        category:       Brand;
        brand:          Brand;
        ratingsAverage: number;
        id:             string;
    }
    
    export interface Brand {
        _id:       ID;
        name:      Name;
        slug:      Slug;
        image?:    string;
        category?: ID;
    }
    
    export enum ID {
        The6407F1Bcb575D3B90Bf95797 = "6407f1bcb575d3b90bf95797",
        The64089Bbe24B25627A253158B = "64089bbe24b25627a253158b",
        The6439D58A0049Ad0B52B9003F = "6439d58a0049ad0b52b9003f",
    }
    
    export enum Name {
        DeFacto = "DeFacto",
        WomenSClothing = "Women's Clothing",
        WomenSFashion = "Women's Fashion",
    }
    
    export enum Slug {
        Defacto = "defacto",
        WomenSClothing = "women's-clothing",
        WomenSFashion = "women's-fashion",
    }
    



