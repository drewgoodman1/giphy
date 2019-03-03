var gifArray = ["mermaids", "red panda", "pirates"];

function addButtons(){
    $("#show-buttons").empty();
    for(var i=0; i<gifArray.length; i++){
        newButton = $("<button>");
        newButton.addClass("gif-btn btn button-outline-primary");
        newButton.attr("data-name", gifArray[i]);
        newButton.text(gifArray[i]);
        $("#show-buttons").append(newButton);
    }
}

$("#searchGif").on("click", function(event){    
    event.preventDefault();    
    var userGif = $("#newUserCategory").val().trim();    
    gifArray.push(userGif);
    addButtons();
  });

function loadGifs(){
    $("#populate-gif").empty();
    var newGifButton = $(this).attr("data-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + newGifButton + "&api_key=hVxGBpUKGBoe3rIpvEYEnvZLCCVbhZko&limit=10";
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response){

            var results = response.data;
            for (i = 0; i < results.length; i++){
                var newGifDiv = $("<div>");
                var p = $("<p>").text("Rating:" + results[i].rating);
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_width_still.url);
                gifImage.attr("still", results[i].images.fixed_width_still.url);
                gifImage.attr("moving", results[i].images.fixed_height.url);
                gifImage.attr("id", "gif-img");
                
                newGifDiv.append(p);
                newGifDiv.append(gifImage);

                $("#populate-gif").prepend(newGifDiv)
            }
        })
}

$(document).on("click", "#gif-img", function (){
    if ($(this).attr("src") === $(this).attr("still")){
        $(this).attr("src", $(this).attr("moving"))
    } else if ($(this).attr("src") === $(this).attr("moving")){
        $(this).attr("src", $(this).attr("still"))
    }
});

addButtons();

$(document).on("click", ".gif-btn", loadGifs);
    
  





