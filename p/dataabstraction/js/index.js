var scores = [],
    headers = [],
    pupilnames = [];

var html = {
	selection: '<select id="pupil" onchange="showPupil(this.value)"></select>',
	table: '<tbody class="table-hover" id="datastoreattempt3"></tbody>'
};

var subjects = {
	AR: "Art",
	BS: "Business Studies",
	EC: "Economics",
	CC: "CC",
	LA: "Latin",
	PL: "PL",
	DE: "Design",
	DR: "Drama",
	EN: "English",
	GG: "Geography",
	CO: "Computing",
	BI: "Biology",
	CH: "Chemistry",
	PH: "Physics",
	PS: "Physical Studies",
	SO: "SO",
	FM: "Further Maths",
	MA: "Maths",
	MU: "Music",
	FR: "French",
	GE: "German",
	SP: "Spanish",
	JP: "JP",
	MN: "MN",
	AP: "AP",
	NLS: "NLS",
	RS: "Religious Studies",
	EA: "EA",
	HI: "History"
}

var type = {
	APP: "Approach",
	GRA: "Grade",
	MED: "Median",
	TES: "Test"
}

function parseCSV() {
    scores = Papa.parse(document.getElementById("dataStore").value).data;
    headers = scores[0];
    scores.shift();
    pupilnames = [];
    for (i = 0; i < scores.length; i++) {
        pupilnames.push([i, scores[i][2], scores[i][1]])
    }
    document.getElementById("selection").innerHTML = html.selection;
    for (i = 0; i < pupilnames.length; i++) {
        var opt = document.createElement("option");
        opt.value = i;
        opt.text = pupilnames[i][1] + ", " + pupilnames[i][2];
        document.getElementById("pupil").appendChild(opt);
    }
    document.getElementById("selection").style.display = "";
    document.getElementById("dataStore").style.display = "none";
    document.getElementById("parseCSVButton").style.display = "none";
}

function showPupil(pupilID) {
    parseCSV();
    var tempheaders = Papa.parse(document.getElementById("dataStore").value).data[0];
    var tempscores = scores[pupilID];
    for (i = 0; i < tempheaders.length; i++) {
        if (tempscores[i] == "") {
            tempscores.splice(i, 1);
            tempheaders.splice(i, 1);
            i--;
        }
    }
    var grade = [],
    	effort= [],
    	other = [];
    var table = document.getElementById("table");
    table.innerHTML = html.table;
    for (i = 0; i < tempheaders.length; i++) {
        var header = tempheaders[i].split(" ");
        header[1] = parseSubject(header[1]);
        header[0] = parseType(header[0]);
        if (header[0] == "App") {
        	effort.push([header, tempscores[i]]);
        } else if (header[0] == "Gra") {
        	grade.push([header, tempscores[i]]);
        } else {
        	other.push([header, tempscores[i]]);
        }
        console.log(header);
        var row = table.insertRow(i);
        row.insertCell(0).innerHTML = header.join(" ");
        row.insertCell(1).innerHTML = tempscores[i];
    }
    document.getElementById("tables").style.display="";
    console.log(grade);
    console.log(effort);
    console.log(other);
}

function parseSubject(subject) {
	try {
		return subjects[subject.toUpperCase()];
	} catch(e) {
		return subject;
	}
}

function parseType(inputType) {
	try {
		var x = type[inputType.toUpperCase()];
		if (x != undefined) {
			return x
		} else {
			return inputType;
		}
	} catch(e) {
		return inputType;
	}
}

/* Formatting function for row details - modify as you need */
function format ( d ) {
    // `d` is the original data object for the row
    return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
        '<tr>'+
            '<td>Full name:</td>'+
            '<td>'+d.name+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Extension number:</td>'+
            '<td>'+d.extn+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Extra info:</td>'+
            '<td>And any further details here (images etc)...</td>'+
        '</tr>'+
    '</table>';
}

var dataset = [
	{
      "name": "Tiger Nixon",
      "position": "System Architect",
      "salary": "$320,800",
      "start_date": "2011/04/25",
      "office": "Edinburgh",
      "extn": "5421"
    },
    {
      "name": "Garrett Winters",
      "position": "Accountant",
      "salary": "$170,750",
      "start_date": "2011/07/25",
      "office": "Tokyo",
      "extn": "8422"
    },
    {
      "name": "Ashton Cox",
      "position": "Junior Technical Author",
      "salary": "$86,000",
      "start_date": "2009/01/12",
      "office": "San Francisco",
      "extn": "1562"
    },
    {
      "name": "Cedric Kelly",
      "position": "Senior Javascript Developer",
      "salary": "$433,060",
      "start_date": "2012/03/29",
      "office": "Edinburgh",
      "extn": "6224"
    },
    {
      "name": "Airi Satou",
      "position": "Accountant",
      "salary": "$162,700",
      "start_date": "2008/11/28",
      "office": "Tokyo",
      "extn": "5407"
    },
    {
      "name": "Brielle Williamson",
      "position": "Integration Specialist",
      "salary": "$372,000",
      "start_date": "2012/12/02",
      "office": "New York",
      "extn": "4804"
    },
    {
      "name": "Herrod Chandler",
      "position": "Sales Assistant",
      "salary": "$137,500",
      "start_date": "2012/08/06",
      "office": "San Francisco",
      "extn": "9608"
    },
    {
      "name": "Rhona Davidson",
      "position": "Integration Specialist",
      "salary": "$327,900",
      "start_date": "2010/10/14",
      "office": "Tokyo",
      "extn": "6200"
    },
    {
      "name": "Colleen Hurst",
      "position": "Javascript Developer",
      "salary": "$205,500",
      "start_date": "2009/09/15",
      "office": "San Francisco",
      "extn": "2360"
    },
    {
      "name": "Sonya Frost",
      "position": "Software Engineer",
      "salary": "$103,600",
      "start_date": "2008/12/13",
      "office": "Edinburgh",
      "extn": "1667"
    },
    {
      "name": "Jena Gaines",
      "position": "Office Manager",
      "salary": "$90,560",
      "start_date": "2008/12/19",
      "office": "London",
      "extn": "3814"
    }
  ]
 
$(document).ready(function() {
    var table = $('#example').DataTable( {
        "data": dataset,
        "columns": [
            {
                "className":      'details-control',
                "orderable":      false,
                "data":           null,
                "defaultContent": ''
            },
            { "data": "name" },
            { "data": "position" },
            { "data": "office" },
            { "data": "salary" }
        ],
        "order": [[2, 'asc']]
    } );
     
    // Add event listener for opening and closing details
    $('#example tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row( tr );
 
        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child( format(row.data()) ).show();
            tr.addClass('shown');
        }
    } );
} );