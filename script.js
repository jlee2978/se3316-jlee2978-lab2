var items = [];
var basket = [];

//item includes type (book or CD), picture, name, days before due
items.push({"ID": 1, "Type": "Book", "Image": "book1.jpg", "Name": "The Wealth of Nations", "French": "La Richesse des Nations", "Due": 30});
items.push({"ID": 2, "Type": "Book", "Image": "book2.jpg", "Name": "The Lord of the Rings", "French": "Le Seigneur des Anneaux", "Due": 30});
items.push({"ID": 3, "Type": "Book", "Image": "book3.jpg", "Name": "The Alchemist", "French": "L'alchimiste", "Due": 30});
items.push({"ID": 4, "Type": "Book", "Image": "book4.jpg", "Name": "The Little Prince", "French": "Le petit Prince", "Due": 30});
items.push({"ID": 5, "Type": "Book", "Image": "book5.jpg", "Name": "The Hobbit", "French": "Le Hobbit", "Due": 30});
items.push({"ID": 6, "Type": "CD", "Image": "cd1.jpg", "Name": "The Marshall Mathers LP", "French": "Marshall Mathers LP [Française]", "Due": 10});
items.push({"ID": 7, "Type": "CD", "Image": "cd2.jpg", "Name": "Stoney", "French": "Stoney [Française]", "Due": 10});
items.push({"ID": 8, "Type": "CD", "Image": "cd3.jpg", "Name": "Friends Keep Secrets", "French": "Les amis gardent leurs secrets", "Due": 10});
items.push({"ID": 9, "Type": "CD", "Image": "cd4.jpg", "Name": "The Eminem Show", "French": "Le spectacle Eminem", "Due": 10});
items.push({"ID": 10, "Type": "CD", "Image": "cd5.jpg", "Name": "Come Away With Me", "French": "Viens avec moi", "Due": 10});

var nameField;
var emailField;
var birthField;
var itemTemplate;

function login()
{
    nameField = getElement("name").value;
    emailField = getElement("email").value.trim();
    birthField = getElement("birth-year").value;

    //check if name is valid
    if (!nameCheck(nameField))
    {
        return;
    }

    //check if email is valid    
    if (!emailCheck(emailField))
    {
        return;
    }

    //check if birth year is valid
    if (!birthCheck(birthField))
    {
        return;
    }
    
    /*
    getElement("nameLabel").innerHTML = nameField;
    getElement("name").innerHTML = "";
    nameLabel = nameField;
    var emailLabel = getElement("email");
    var birthLabel = getElement("birth");
    */

    //hide labels and text
    getElement("loginForm").style.display = "none";

    //displays logged in user info
    var age = "Child";
    if((new Date()).getFullYear() - birthField > 18)
    {
        age = "Adult";
    }
    getElement("userInfo").innerHTML = nameField+" ("+emailField+") ["+age+"]"

    displayItems();
}

function nameCheck(fieldValue)
{
    //var fieldValue = document.getElementById("name").nodeValue;     //username? .value?
    if (fieldValue == null || fieldValue == "")
    {
        //empty field
        alert("You must enter a name.");
        return 0;
    }
    if (fieldValue.length > 100)
    {
        //more than 100 chars
        alert("You must enter less than 100 characters.");
        return 0;
    }
    return 1;
}

function emailCheck(fieldValue)
{
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(fieldValue))
    {
        return 1;
    }
    else
    {
        alert("You must enter a valid email address.");
        return 0;
    }
}

function birthCheck(fieldValue)
{
    if (fieldValue < 1900 || fieldValue > (new Date()).getFullYear() || isNaN(fieldValue))
    {
        alert("You must enter a year greater or equal to 1900 and less than or equal to the current year.");
        return 0;
    }
    return 1;
}

function displayItems()
{
    var olItems = getElement("available-items");
    var cloneTemplate;
    itemTemplate = getElement("item-template");

    for (var i = 0; i < items.length; i++)
    {
        cloneTemplate = itemTemplate.cloneNode(true);
        var li = document.createElement("li");

        cloneTemplate.innerHTML = cloneTemplate.innerHTML.replace(/#itemID/gi, items[i].ID);
        cloneTemplate.innerHTML = cloneTemplate.innerHTML.replace(/#type/, items[i].Type);
        cloneTemplate.innerHTML = cloneTemplate.innerHTML.replace(/#image/, items[i].Image);
        if (getElement("language").value == "E")
        {
            cloneTemplate.innerHTML = cloneTemplate.innerHTML.replace(/#name/, items[i].Name);
        }
        else{
            cloneTemplate.innerHTML = cloneTemplate.innerHTML.replace(/#name/, items[i].French);
        }
        cloneTemplate.innerHTML = cloneTemplate.innerHTML.replace(/#due/, items[i].Due);

        li.innerHTML = cloneTemplate.innerHTML;
        olItems.appendChild(li);
    }
}

function addItem(itemID)
{
    var olBasket = getElement("basket");
    var cloneTemplate;
    itemTemplate = getElement("basket-template");

    cloneTemplate = itemTemplate.cloneNode(true);
    var li = document.createElement("li");

    for(var i = 0; i < items.length; i++)
    {
        if (items[i].ID == itemID)
        {
            cloneTemplate.innerHTML = cloneTemplate.innerHTML.replace(/#itemID/gi, itemID);
            cloneTemplate.innerHTML = cloneTemplate.innerHTML.replace(/#type/, items[i].Type);
            //cloneTemplate.innerHTML = cloneTemplate.innerHTML.replace(/#image/, items[i].Image);
            //cloneTemplate.innerHTML = cloneTemplate.innerHTML.replace(/#name/, items[i].Name);
            
            if (getElement("language").value == "E")
            {
                cloneTemplate.innerHTML = cloneTemplate.innerHTML.replace(/#name/, items[i].Name);
            }
            else{
                cloneTemplate.innerHTML = cloneTemplate.innerHTML.replace(/#name/, items[i].French);
            }
            
            var dueDate = new Date();
            dueDate.setDate(dueDate.getDate() + items[i].Due);
            dueDate = dueDate.getFullYear() + '-' + (dueDate.getMonth() + 1) + '-' + dueDate.getDate();
            cloneTemplate.innerHTML = cloneTemplate.innerHTML.replace(/#due/, dueDate);
            
            basket.push(items[i]);

            //remove item from the items array and also remove it from the displayed list item
            items.splice(i, 1);
            document.querySelector('#available-items li[id="'+itemID+'"]').remove();

            break;
        }
    }
    li.innerHTML = cloneTemplate.innerHTML;
    olBasket.appendChild(li);
}

function removeItem(itemID)
{
    var olItems = getElement("available-items");
    var cloneTemplate;
    itemTemplate = getElement("item-template");

    for (var i = 0; i< basket.length; i++)
    {
        if (basket[i].ID == itemID)
        {
            items.push(basket[i]);

            cloneTemplate = itemTemplate.cloneNode(true);
            var li = document.createElement("li");

            cloneTemplate.innerHTML = cloneTemplate.innerHTML.replace(/#itemID/gi, itemID);
            cloneTemplate.innerHTML = cloneTemplate.innerHTML.replace(/#type/, basket[i].Type);
            cloneTemplate.innerHTML = cloneTemplate.innerHTML.replace(/#image/, basket[i].Image);
            if (getElement("language").value == "E")
            {
                cloneTemplate.innerHTML = cloneTemplate.innerHTML.replace(/#name/, basket[i].Name);
            }
            else{
                cloneTemplate.innerHTML = cloneTemplate.innerHTML.replace(/#name/, basket[i].French);
            }
            cloneTemplate.innerHTML = cloneTemplate.innerHTML.replace(/#due/, basket[i].Due);

            li.innerHTML = cloneTemplate.innerHTML;
            olItems.appendChild(li);
            
            //remove item from the basket array and also remove it from the displayed list item
            document.querySelector('#basket li[id="'+itemID+'"]').remove();
            basket.splice(i, 1);
            break;
        }
    }
}






//use document.getElementByID() to pick element
function getElement(id)
{
    return document.getElementById(id);
}