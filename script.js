function login()
{
    var nameField = getElement("name").value;
    if (!nameCheck(nameField))
    {
        return;
    }

    var emailField = getElement("email").value.trim();
    if (!emailCheck(emailField))
    {
        return;
    }

    var birthField = getElement("birth-year").value;
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

function getElement(id)
{
    return document.getElementById(id);
}