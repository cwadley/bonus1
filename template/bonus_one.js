// The anonymous function below will fire on page load

// Some things to consider
// $.ajax(); to make your requests a little easier. Or the vanilla js way, it's up to you.
// $.on(); for event handling
// Remember, selecting elements in jQuery is like selecting them in CSS
// You'll probably have to manipulate some strings
// some jQuery functions to help display results
// $.show(), $.hide(), $.slideup(), $.slidedown(), $.fadein(), $.fadeout()
// Add content from requests with something like
// $.html(), $.text(), etc.
// keyup events could be helpful to get value of field as the user types

var mahData;

(function() {
	// Magic!
	console.log('Keepin\'n it clean with an external script!');

    // retrieve the data and make an object
    getAPIData();

    // Register the keypress handler to the search input field
    $(".flexsearch-input").on("keyup", narrowList);

    // Register the click handler to the result list
    $("#resultList").on("click", clickyClick);

    // Register the submit handler to the form
    $("#mainForm").on("submit", searchGoogle);

})();

/*
* Sends an AJAX request to the api to get the data, inserts it into a hidden div
*/
function getAPIData()
{
    $.ajax({
        url: "http://www.mattbowytz.com/simple_api.json?data=all",
        dataType: "json",
        success: function(response){
            mahData = JSON.parse(JSON.stringify(response));
            var value;

            // sort the arrays in the object
            mahData.data.interests.sort();
            mahData.data.programming.sort();

            // insert the interests data
            $("#resultList").append("<li class=\"category\">Interests</li>");
            for (value in mahData.data.interests)
            {
                $("#resultList").append("<li class=\"item\" style=\"display: none;\">" + mahData.data.interests[value] + "</li>");
            }

            // insert the programming data
            $("#resultList").append("<li class=\"category\">Programming</li>");
            for (value in mahData.data.programming)
            {
                $("#resultList").append("<li class=\"item\" style=\"display: none;\">" + mahData.data.programming[value] + "</li>");
            }
        }
    });
}

/*
* Searches and narrows the list based on the search box text
*/
function narrowList()
{
    // get the input string and make it lower case
    var input = $(".flexsearch-input").val();
    input = input.toLowerCase();

    // search through the lists, making prefixes visible
    $(".item").each(function(){
        var listItem = $(this).text().toLowerCase();
        if (isAPrefix(input, listItem))
        {
            $(this).slideDown(200);
        }
        else
        {
            $(this).slideUp(200);
        }
    })
}

/*
* Replaces the search field text with the clicked value and searches google
*/
function clickyClick(event)
{
    // get the text of the list item that was clicked and put it in the input field
    var searchTerm = $(event.target).text();
    $(".flexsearch-input").val(searchTerm);

    // perform the google search
    searchGoogle(event);
}


/*
* Submits the current input text as a google search
*/
function searchGoogle(event)
{
    // prevent the default submit action
    event.preventDefault();
    
    // get the string from the input field and navigate to the google query 
    var searchString = $(".flexsearch-input").val();
    if (searchString != "")
    {
        window.location.href = "https://www.google.com/#q=" + searchString;
    }
}

/*
* Performs character operations to determine if inputString is a prefix of listString
* Returns true if it is a prefix, false otherwise.
*/
function isAPrefix(inputString, listString)
{
    // if the input is longer than the current list item, or is empty, return false
    if (inputString.length > listString.length || inputString == "")
    {
        return false;
    }

    // walk through each character in the input string, comparing it as we go
    for (var i = 0; i < inputString.length; i++)
    {
        if (inputString.charAt(i) != listString.charAt(i))
        {
            return false;
        }
    }

    return true;
}
