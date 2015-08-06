function getJSON() {
    $.getJSON("https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=Y_frQ3VoT4g,O0I6dwnM-Ho,DHT1c6GNk1o,2BrWFylB_nE,6k4UQkagOGA,aDDoOIfecKk,B91Fxd9oe0c,XcgCS_FT0QU,00JQRue9r-Y,d5zFURISLgA,X00LET30gLM,jU4CR31Ekdg,XrNuE3-p2VM,LJlT4aHRFR8,CobwJUP2AIA,kPatFT_3ziU&key=AIzaSyAOa0igcKcrRTVkk_NTNEha8Ch7bOAe7j8", function(data) {
        var ytData = data.items;
        var array = [];
        for (i = 0; i < ytData.length; i++) {
            array.push({
                id: ytData[i].id,
                views: parseFloat(ytData[i].statistics.viewCount)
            });
        }
        printData(array);
    })
}

function printData(array) {
    array.sort(function(a, b) {
        return a.views - b.views;
    });

    Morris.Bar({
        element: 'bar-example',
        data: array,
        xkey: 'id',
        ykeys: ['views'],
        labels: ['ID']
    });
}
getJSON();
