var key = atob("QUl6YVN5QU9hMGlnY0tjclJUVmtrX05UTkVoYThDaDdiT0FlN2o4");
var j = 0;
var newArray = [];

function getJSON() {
    $.getJSON("https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=Y_frQ3VoT4g,O0I6dwnM-Ho,DHT1c6GNk1o,2BrWFylB_nE,6k4UQkagOGA,aDDoOIfecKk,B91Fxd9oe0c,XcgCS_FT0QU,00JQRue9r-Y,d5zFURISLgA,X00LET30gLM,jU4CR31Ekdg,XrNuE3-p2VM,LJlT4aHRFR8,CobwJUP2AIA,kPatFT_3ziU&key=" + key, function(data) {
        var ytData = data.items;
        var array = [];
        for (i = 0; i < ytData.length; i++) {
            array.push({
                id: ytData[i].id,
                views: parseFloat(ytData[i].statistics.viewCount),
                like: parseFloat(ytData[i].statistics.likeCount)
            });
        }
        getNames(array);
    })
}

function getData() {
    $.getJSON("data.json", function(data) {
        console.log(data);    
    })
}

function sortData(array, returnType) {
    array.sort(function(a, b) {
        return a[returnType] - b[returnType];
    });
    return array;
}


function loadInfo(array) {
    $.getJSON("https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" + array.id + "&key=" + key, function(data) {
        console.log(array.id + ", " + data.items[0].snippet.title)
        j = j + 1;
        var ytTitleData = data.items[0].snippet.title;
        // console.log(ytTitleData);
        newArray.push({
            id: array.id,
            name: ytTitleData.substring(26),
            views: array.views,
            like: array.like
        });
        if (j == 16) {
            printData(sortData(newArray, "views"), "views", ['views'], ['Views']);
            printData(sortData(newArray, "like"), "likes", ['like'], ['Likes']);
        }
    });

}

function getNames(array) {
    for (i = 0; i < array.length; i++) {
        loadInfo(array[i]);
    }
}

function intoArrays(array, type) {
    var views = [];
    var likes = [];
    var names = [];
    for (i = 0; i < array.length; i++) {
        Views.push(array[i].views);
        likes.push(array[i].like);
        names.push(array[i].name)
    }
    printData(names, views, likes)

}

function printData(names, views, likes) {
    var data = {
        labels: names,
        datasets: [{
            label: "Views",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: views
        }, {
            label: "Likes",
            fillColor: "rgba(151,187,205,0.5)",
            strokeColor: "rgba(151,187,205,0.8)",
            highlightFill: "rgba(151,187,205,0.75)",
            highlightStroke: "rgba(151,187,205,1)",
            data: likes
        }]
    };
    var ctx = document.getElementById("viewsAndLikes").getContext("2d");
    var myBarChart = new Chart(ctx).Bar(data);

}

getData();
getJSON();
