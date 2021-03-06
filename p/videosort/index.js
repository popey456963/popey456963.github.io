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

function sortData(array, returnType) {
    array.sort(function(a, b) {
        return a[returnType] - b[returnType];
    });
    return array;
}


function loadInfo(array) {
    $.getJSON("https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" + array.id + "&key=" + key, function(data) {
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

function printData(array, div, label, name) {
    Morris.Bar({
        element: div,
        data: array,
        xkey: 'name',
        ykeys: label,
        labels: name
    });
}

getJSON();
