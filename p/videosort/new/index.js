var data = {};

function getData() {
    $.getJSON("http://popey456963.github.io/p/videosort/new/data.json", function(json) {
        console.log(json);

        data = {
            labels: [],
            datasets: []
        };

        for (i = 0; i < json.length; i++) {
            data.labels.push(json[i].date);

            newData = [];
            for (i2 = 0; i2 < json[i].statistics.length; i++) {
                newData.push(json[i].statistics[i2][1]);
            }
            console.log(newData);
            data.datasets.push({
                label: json[i][0],
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,0.8)",
                highlightFill: "rgba(220,220,220,0.75)",
                highlightStroke: "rgba(220,220,220,1)",
                data: newData
            });
            console.log(data);
        }


    })
}

function sortData(array, returnType) {
    array.sort(function(a, b) {
        return a[returnType] - b[returnType];
    });
    return array;
}

function printData(names, views, likes) {

    var ctx = document.getElementById("viewsAndLikes").getContext("2d");
    var myBarChart = new Chart(ctx).Bar(data);

}

getData();
