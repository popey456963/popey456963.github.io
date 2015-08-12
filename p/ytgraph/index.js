function matrix(rows, cols, defaultValue) {
    var arr = [];
    for (var i = 0; i < rows; i++) {
        arr.push([]);
        arr[i].push(new Array(cols));
        for (var j = 0; j < cols; j++) {
            arr[i][j] = defaultValue;
        }
    }
    return arr;
}

function drawChart(inputData) {
    if (inputData.constructor === Array) {} else {
        return null
    }
    var data = new google.visualization.DataTable();

    /*
    6k4UQkagOGA Train Trip
    kPatFT_3ziU Clinical Calculator
    XcgCS_FT0QU P.U.M.P.S
    aDDoOIfecKk Buoy
    LJlT4aHRFR8 Smart Scrawl
    Y_frQ3VoT4g Lines
    DHT1c6GNk1o Intelligent Elephant Alarm
    XrNuE3-p2VM Loci
    d5zFURISLgA Refresh
    O0I6dwnM-Ho On the way to an A
    X00LET30gLM Ko-Lect
    CobwJUP2AIA Live Listener
    B91Fxd9oe0c Pedal Plan
    jU4CR31Ekdg ArduDuck
    2BrWFylB_nE Festable
    00JQRue9r-Y Emby
    */
    
    data.addColumn('number', 'Time');
    data.addColumn('number', 'Train Trip');
    data.addColumn('number', 'Clinical Calculator');
    data.addColumn('number', 'P.U.M.P.S');
    data.addColumn('number', 'Buoy');
    data.addColumn('number', 'Smart Scrawl');
    data.addColumn('number', 'Lines');
    data.addColumn('number', 'Intelligent Elepehant Alarm');
    data.addColumn('number', 'Loci');
    data.addColumn('number', 'Refresh');
    data.addColumn('number', 'On the way to an A');
    data.addColumn('number', 'Ko-Lect');
    data.addColumn('number', 'Live Listener');
    data.addColumn('number', 'Pedal Plan');
    data.addColumn('number', 'ArduDuck');
    data.addColumn('number', 'Festable');
    data.addColumn('number', 'Emby');

    data.addRows(inputData);

    var options = {
        chart: {
            title: 'Video View Count',
            subtitle: 'over one week'
        },
        width: screen.width,
        height: screen.height,
        vAxis: {
            logScale: true
        }

    };

    var chart = new google.charts.Line(document.getElementById('linechart_material'));

    chart.draw(data, options);
}

function getJSON() {
    json = JSON.parse(json);
    var mdArray = [];
    var a = [], //Train Trip
        b = [], //Clinical Claculator
        c = [], //P.U.M.P.S
        d = [], //Buoy
        e = [], //Smart Scrawl
        f = [], //Lines
        g = [], //Intelligent Elephant Alarm
        h = [], //Loci
        q = [], //Refresh
        j = [], //On the way to an A
        k = [], //Ko-Lect
        l = [], //Live Listener
        m = [], //Pedal Plan
        n = [], //ArduDuck
        o = [], //Festable
        p = []; //Emby
    $.each(json, function(i, fb) {
        var date = new Date(fb.date).getTime() / 1000
        a.push(String(fb.statistics['6k4UQkagOGA'][1]));
        b.push(String(fb.statistics['kPatFT_3ziU'][1]));
        c.push(String(fb.statistics['XcgCS_FT0QU'][1]));
        d.push(String(fb.statistics['aDDoOIfecKk'][1]));
        e.push(String(fb.statistics['LJlT4aHRFR8'][1]));
        f.push(String(fb.statistics['Y_frQ3VoT4g'][1]));
        g.push(String(fb.statistics['DHT1c6GNk1o'][1]));
        h.push(String(fb.statistics['XrNuE3-p2VM'][1]));
        q.push(String(fb.statistics['d5zFURISLgA'][1]));
        j.push(String(fb.statistics['O0I6dwnM-Ho'][1]));
        k.push(String(fb.statistics['X00LET30gLM'][1]));
        l.push(String(fb.statistics['CobwJUP2AIA'][1]));
        m.push(String(fb.statistics['B91Fxd9oe0c'][1]));
        n.push(String(fb.statistics['jU4CR31Ekdg'][1]));
        o.push(String(fb.statistics['2BrWFylB_nE'][1]));
        p.push(String(fb.statistics['00JQRue9r-Y'][1]));
    });
    mdArray.push(a, b, c, d, e, f, g, h, q, j, k, l, m, n, o, p);
    newMdArray = _.zip.apply(_, mdArray);

    for (i = 0; i < newMdArray.length; i++) {
        newMdArray[i].unshift(i + 1);
    }

    newMdArray2 = matrix(newMdArray.length, 17, 0)

    for (i = 0; i < newMdArray.length; i++) {
        for (j = 0; j < newMdArray[i].length; j++) {
            newMdArray2[i][j] = parseInt(newMdArray[i][j], 10);
        }
    }
    console.log(newMdArray2);
    drawChart(newMdArray2);
}