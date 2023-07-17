import { v4 as uuidv4 } from "uuid";

class Item {
    public id: string
    private _name: string
    private _price: number
    private _description: string
    private _quantity: number

    constructor(name: string, price: number, description: string, quantity: number) {
        this.id = uuidv4()
        this._name = name
        this._price = price
        this._description = description
        this._quantity = quantity
    }

    public get name(): string {
        return this._name
    }

    public set name(value: string) {
        this._name = value 
    }

    public get price(): number {
        return this._price 
    }

    public set price(value: number) {
        this._price = value 
    }

    public get description(): string {
        return this._description 
    }

    public set description(value: string) {
        this._description = value 
    }

    public get quantity(): number {
        return this._quantity 
    }

    public set quantity(value: number) {
        this._quantity = value 
    }

    public itemElement(): HTMLElement {
        const itemDiv = document.createElement("div") 
        itemDiv.className = "card mt-3 mb-3" 
        itemDiv.style.width = "18rem" 

        const ul = document.createElement('ul') 
        ul.className = 'list-group list-group-flush' 

        const nameLi = document.createElement('li') 
        nameLi.className = 'list-group-item' 
        nameLi.innerText = this.name 

        const descriptionLi = document.createElement('li') 
        descriptionLi.className = 'list-group-item' 
        descriptionLi.innerText = `Description: ${this.description}` 

        const quantityLi = document.createElement('li') 
        quantityLi.className = 'list-group-item' 
        quantityLi.innerText = `Quantity: ${this.quantity}` 

        const priceLi = document.createElement('li') 
        priceLi.className = 'list-group-item' 
        priceLi.innerText = `Price: ${this.price}` 

        const addButton = document.createElement("button") 
        addButton.className = 'btn btn-primary' 
        addButton.innerText = 'Add to Cart' 
        addButton.addEventListener('click', () => {
            User.addToCart(this) 
            User.updateCart() 
        }) 

        ul.appendChild(nameLi) 
        ul.appendChild(descriptionLi) 
        ul.appendChild(quantityLi) 
        ul.appendChild(priceLi) 
        ul.appendChild(addButton) 

        itemDiv.appendChild(ul) 
        return itemDiv 
    }

    private addToCart(): void {
        Cart.addToCart(this) 
    }
}

class User {
    private _id: string 
    private _name: string 
    private _age: number 
    private static myUser: User | undefined 
    private static cart: Cart 

    constructor(name: string, age: number) {
        this._id = uuidv4() 
        this._name = name 
        this._age = age 
    }

    public get id(): string {
        return this._id 
    }

    public get name(): string {
        return this._name 
    }

    public get age(): number {
        return this._age 
    }

    public static loginUser(): User | null {
        const newUserName = <HTMLInputElement>document.getElementById("user-name") 
        const newUserAge = <HTMLInputElement>document.getElementById("user-age") 

        const name = newUserName.value 
        const age = Number(newUserAge.value) 

        if (!name || !age) {
            alert("Please enter a valid name and age. Try again!") 
            return null 
        }

        const addItemForm = document.getElementById("add-item-form") 
        if (addItemForm) {
            addItemForm.style.display = 'block' 
        }

        this.myUser = new User(name, age) 
        this.cart = new Cart() 
        this.createShopAndCart() 
        return this.myUser 
    }

    public static createShopAndCart(): void {
        const shop = new Shop() 
        shop.showItems() 

        const cartDiv = document.getElementById('cart-area') 
        if (cartDiv) {
            cartDiv.appendChild(this.cart.cartHTMLElement()) 
        }
    }

    public static cartHTMLElement(): HTMLElement {
        return this.cart.updateCart()
    }

    public static addToCart(item: Item): void{
        this.cart.addToCart(item)
    }

    public static updateCart(): void {
        this.cart.updateCart() 
    }

    public static removeFromCart(itemId: string): void {
        this.cart.removeFromCart(itemId) 
    }
}

class Cart {
    private _items: Item[] 
    static addToCart: any 
    static updateCart: any
    cartHTMLElement: any 

    constructor() {
        this._items = [] 
    }

    public get cart(): Item[] {
        return this._items 
    }

    public addToCart(item: Item): void {
        this._items.push(item) 
    }

    public removeFromCart(itemId: string): void {
        this._items = this._items.filter((item) => item.id !== itemId) 
    }

    public updateCart(): HTMLElement {
        const cartDiv = document.getElementById('cart') 
        if (cartDiv) {
            cartDiv.innerHTML = "" 

            const cartItem = this._items 
            if (cartItem.length === 0) {
                const emptyCart = document.createElement('p') 
                emptyCart.innerText = 'Your Cart is Empty' 
                cartDiv.appendChild(emptyCart) 
            } else {
                cartItem.forEach((item) => {
                    const itemDiv = document.createElement('div') 
                    itemDiv.className = 'cart-item' 

                    const nameSpan = document.createElement('span') 
                    nameSpan.innerText = item.name 

                    const quantitySpan = document.createElement('span') 
                    quantitySpan.innerText = ` Quantity: ${item.quantity} ` 

                    const priceSpan = document.createElement('span') 
                    priceSpan.innerText = `Price: $${item.price}` 

                    const removeButton = document.createElement('button') 
                    removeButton.className = 'btn btn-danger btn-remove' 
                    removeButton.innerText = 'Remove' 
                    removeButton.setAttribute("data-id", item.id) 
                    removeButton.addEventListener('click', () => {
                        this.removeFromCart(item.id) 
                        User.updateCart() 
                    }) 

                    itemDiv.appendChild(nameSpan) 
                    itemDiv.appendChild(quantitySpan) 
                    itemDiv.appendChild(priceSpan) 
                    itemDiv.appendChild(removeButton) 

                    cartDiv.appendChild(itemDiv) 
                }) 
            }
        }
        return cartDiv! 
    }
}

class Shop {
    private _items: Item[] 

    constructor() {
        this._items = [
            new Item("Item 1", 10, 'Description 1', 5),
            new Item("Item 2", 15, 'Description 2', 6),
            new Item("Item 3", 20, 'Description 3', 7),
            new Item("Item 4", 25, 'Description 4', 8),
            new Item("Item 5", 30, 'Description 5', 9),
            new Item("Item 6", 35, 'Description 6', 10)
        ] 
    }

    public get items(): Item[] {
        return this._items 
    }

    public showItems(): void {
        const shopDiv = document.getElementById('shop') 
        if (shopDiv) {
            shopDiv.innerHTML = "" 
            this._items.forEach((item) => {
                const itemElement = item.itemElement() 
                shopDiv.appendChild(itemElement) 
            }) 
        }
    }
}

const submitButton = document.getElementById("submit-button") 
submitButton?.addEventListener("click", () => {
    const user = User.loginUser() 
    if (user) {
        const loginForm = document.getElementById('login')
        if (loginForm) {
            loginForm.style.display = 'none'
        }
    }
}) 

const addItemButton = document.getElementById('add-item-form') as HTMLElement
addItemButton?.addEventListener('click', () => {
    const itemNameimput = document.getElementById('item-name') as HTMLInputElement
    const itemQuantityInput = document.getElementById('item-quantity') as HTMLInputElement

    const itemName = itemNameimput.value.trim()
    const itemQuantity = parseInt(itemQuantityInput.value.trim(), 10)

    if (itemName && isNaN(itemQuantity)){
        const newItem = new Item(itemName, 0 , 'No description', itemQuantity)
        User.addToCart(newItem)
        User.updateCart()
    } 
})

 