var items = [];
var basket = [];
var lastID;

//item includes type (book or CD), picture, name, days before due
items.push({"ID": 1, "Type": "Book", "Image": "book1.jpg", "Name": "The Wealth of Nations", "French": "La Richesse des Nations", "Due": 30});
items.push({"ID": 2, "Type": "Book", "Image": "book2.jpg", "Name": "The Lord of the Rings", "French": "Le Seigneur des Anneaux", "Due": 30});
items.push({"ID": 3, "Type": "Book", "Image": "book3.jpg", "Name": "The Alchemist", "French": "L'alchimiste", "Due": 30});
items.push({"ID": 4, "Type": "Book", "Image": "book4.jpg", "Name": "The Little Prince", "French": "Le petit Prince", "Due": 30});
items.push({"ID": 5, "Type": "Book", "Image": "book5.jpg", "Name": "The Hobbit", "French": "Le Hobbit", "Due": 30});
items.push({"ID": 6, "Type": "CD", "Image": "cd1.jpg", "Name": "Stories", "French": "Histoires", "Due": 10});
items.push({"ID": 7, "Type": "CD", "Image": "cd2.jpg", "Name": "Stoney", "French": "Stoney [Française]", "Due": 10});
items.push({"ID": 8, "Type": "CD", "Image": "cd3.jpg", "Name": "Friends Keep Secrets", "French": "Les Amis Gardent Leurs Secrets", "Due": 10});
items.push({"ID": 9, "Type": "CD", "Image": "cd4.jpg", "Name": "The Eminem Show", "French": "Le Spectacle Eminem", "Due": 10});
items.push({"ID": 10, "Type": "CD", "Image": "cd5.jpg", "Name": "Suncity", "French": "Suncity [Française]", "Due": 10});

lastID = items.length;

var nameField;
var emailField;
var birthField;
var itemTemplate;

// Add a addDays functionality to the Date object
Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + parseInt(days));
    return date;
}

function login()
{
    nameField = getElement("name").value;
    emailField = getElement("email").value.trim();
    birthField = getElement("birth-year").value;
    
    var age = "Child";
    if((new Date()).getFullYear() - birthField > 18)
    {
        age = "Adult";
    }

    //if name is "admin" and year of birth is "1867"
    if(nameField == "admin" && birthField == "1867")
    {             

        //hide labels and text
        getElement("loginForm").style.display = "none";
        getElement("userInfo").innerHTML = "Librarian" + " (" + emailField + ") [" + age + "]";
        setVisibility('newItem', 'block');
        setVisibility('available-items', 'block');

        displayAdmin();
    }
    else
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
        //hide labels and text
        getElement("loginForm").style.display = "none";
        getElement("loggedIn").style.display = "block";

        //displays logged in user info
        getElement("userInfo").innerHTML = nameField+" ("+emailField+") ["+age+"]";
        
        setVisibility('newItem', 'none');
        setVisibility('available-items', 'block');
        setVisibility('basket', 'block');
        setVisibility('checkout', 'block');

        displayItems();
    }

    setVisibility('main-section', 'block');
    setVisibility('loggedIn', 'block');
}

function logout()
{
    if(basket.length > 0)
    {
        alert("Please checkout or remove all items from basket.");
        return;
    }
    getElement("loginForm").reset();
    getElement("userInfo").innerHTML = "";
    //getElement("userInfo").style.display = "block";
    getElement("loginForm").style.display = "block";
    getElement("loggedIn").style.display = "none";

    setVisibility('main-section', 'none');

    setVisibility('newItem', 'none');
    setVisibility('available-items', 'none');
    setVisibility('checkout', 'none');

    //clear items and basket
    getElement("available-items").style.display = "none";
    getElement("basket").style.display = "none";

    //remove items from display
    var children = document.querySelectorAll('#available-items li');
    children.forEach(function(child, index) {child.remove(); })

    //remove items from display
    var children = document.querySelectorAll('#basket li');
    children.forEach(function(child, index) {child.remove(); })
}

function displayAdmin()
{
    for (var i = 0; i < items.length; i++)
    {
        displayAdminAvailable(items[i]);
    }
}

function displayAdminAvailable(item)
{
    var olItems = getElement("available-items");
    var cloneTemplate;
    itemTemplate = getElement("admin-template");

    cloneTemplate = itemTemplate.cloneNode(true);
    var li = document.createElement("li");

    cloneTemplate.innerHTML = cloneTemplate.innerHTML.replace(/#itemID/gi, item.ID);
    cloneTemplate.innerHTML = cloneTemplate.innerHTML.replace(/#type/, item.Type);
    cloneTemplate.innerHTML = cloneTemplate.innerHTML.replace(/#image/, item.Image);
    cloneTemplate.innerHTML = cloneTemplate.innerHTML.replace(/#eName/, item.Name);
    cloneTemplate.innerHTML = cloneTemplate.innerHTML.replace(/#fName/, item.French);
    cloneTemplate.innerHTML = cloneTemplate.innerHTML.replace(/#dueDays/, item.Due);

    if (item.Type == "Book")
    {
        cloneTemplate.innerHTML = cloneTemplate.innerHTML.replace(/value="Book"/, 'value="Book" selected');
    }
    else
    {
        cloneTemplate.innerHTML = cloneTemplate.innerHTML.replace(/value="CD"/, 'value="CD" selected');
    }

    li.innerHTML = cloneTemplate.innerHTML;
    olItems.appendChild(li);
}

function updateItem(itemID, property, value)
{
    for (var i = 0; i < items.length; i++)
    {
        if (items[i].ID == itemID)
        {
            items[i][property] = value;
            displayAdminAvailable(item);
            
            break;
        }
    }
}

function deleteItem(itemID)
{
    document.querySelector("#available-items li[id='"+itemID+"']" ).remove();

    for (var i = 0; i < items.length; i++)
    {
        if (items[i].ID == itemID)
        {
            items.splice(i, 1);

            break;
        }
    }

}


function nameCheck(fieldValue)
{
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
    for (var i = 0; i < items.length; i++)
    {
        displayAvailable(items[i]);
    }
}

function displayAvailable(item)
{
    var olItems = getElement("available-items");
    var cloneTemplate;
    itemTemplate = getElement("item-template");

    cloneTemplate = itemTemplate.cloneNode(true);
    var li = document.createElement("li");

    cloneTemplate.innerHTML = cloneTemplate.innerHTML.replace(/#itemID/gi, item.ID);
    cloneTemplate.innerHTML = cloneTemplate.innerHTML.replace(/#type/, item.Type);
    cloneTemplate.innerHTML = cloneTemplate.innerHTML.replace(/#image/, item.Image);
    if (getElement("language").value == "E")
    {
        cloneTemplate.innerHTML = cloneTemplate.innerHTML.replace(/#name/, item.Name);
    }
    else{
        cloneTemplate.innerHTML = cloneTemplate.innerHTML.replace(/#name/, item.French);
    }
    cloneTemplate.innerHTML = cloneTemplate.innerHTML.replace(/#due/, item.Due);

    li.innerHTML = cloneTemplate.innerHTML;
    olItems.appendChild(li);
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
            
            if (getElement("language").value == "E")
            {
                cloneTemplate.innerHTML = cloneTemplate.innerHTML.replace(/#name/, items[i].Name);
            }
            else{
                cloneTemplate.innerHTML = cloneTemplate.innerHTML.replace(/#name/, items[i].French);
            }

            var date = new Date();
			var month, day;
				
			date = date.addDays(items[i].Due);
			month = date.getMonth() + 1;
			day = date.getDate();
				
            if (month < 10)
            {
				month = '0' + month;
            }
				
            if (day < 10)
            {
				day = '0' + day;
            }
				
			var dueDate = date.getFullYear() + '-' + month + '-' + day;


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

function addNewItem()
{
    if (getElement("name").value == "admin")
    {
        var eName = getElement("eName").value;
        var fName = getElement("fName").value;
        var image = getElement("image").value;
        var due = getElement("dueDays").value;
        var type = getElement("type").value;
    
        var item = {"ID": ++lastID, "Type": type, "Image": image, "Name": eName, "French": fName, "Due": due};
        items.push(item);
        displayAdminAvailable(item);

    }
    else{
        alert("You must be an admin to add a new title.");
    }
}

function removeItem(itemID)
{
    var olItems = getElement("available-items");
    var cloneTemplate;
    itemTemplate = getElement("item-template");

    for (var i = 0; i < basket.length; i++)
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

function confirmation()
{
    var answer = window.confirm("Checkout?");
    if (answer)
    {
        for (var i = basket.length; i > 0; i--)
        {
            document.querySelector('#basket li[id="'+basket[i-1].ID+'"]').remove();
            basket.splice(i, 1);
        }
    }
    else{
        for (var i = 0; i < basket.length; i++)
        {
            items.push(basket[i]);
            displayAvailable(basket[i]);
            document.querySelector('#basket li[id="'+basket[i].ID+'"]').remove();
        }
    }

    //clear basket memory
    basket = [];
}


//set visibility of different HTML elements
function setVisibility(id, visibility)
{
    getElement(id).style.display = visibility;
}

//use document.getElementByID() to pick element
function getElement(id)
{
    return document.getElementById(id);
}