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

var headnames = {
  gender: "GEN",
  forename: "FNAME",
  surname: "SUR",
  tutor: "Tutor Group",
  overall: "Overall Band Y12"
}

var scores = [],
    headers = [];

var dataset = [];

function parseCSV() {
  scores = Papa.parse($("#dataStore").val()).data;
  headers = scores[0];
  scores.shift();
}

function addPupil(pupilData) {
  var currentHeaders = Papa.parse($("#dataStore").val()).data[0];
  var pupilData = pupilData;
  for (i = 0; i < currentHeaders.length; i++) {
    if (pupilData[i] == "" || pupilData[i] == undefined || pupilData[i] == "undefined") {
      pupilData.splice(i, 1);
      currentHeaders.splice(i, 1);
      i--;
    }
  }
  var gender = "",
      fname  = "",
      sname  = "",
      tutor  = "",
      band   = "";
  var other = [];

  for (i = 0; i < currentHeaders.length; i++) {
    if (currentHeaders[i] == headnames.gender) {
      gender = pupilData[i];
    } else if (currentHeaders[i] == headnames.forename) {
      fname =  pupilData[i];
    } else if (currentHeaders[i] == headnames.surname) {
      sname =  pupilData[i];
    } else if (currentHeaders[i] == headnames.tutor) {
      tutor =  pupilData[i];
    } else if (currentHeaders[i] == headnames.overall) {
      band =   pupilData[i];
    } else {
      other.push([currentHeaders[i], pupilData[i]]);
    }
  }
  console.log("Gender: " + gender);
  console.log("Forename: " + fname);
  console.log("Surname: " + sname);
  console.log("Tutor: " + tutor);
  console.log("Band: " + band);
  console.log(other);

  dataset.push({
    gender: gender, 
    fname: fname + " " + sname, 
    tutor: tutor, 
    band: band,
    other: other
  });
}

function format(d) {
  string = ""
  for (j = 0; j < 6; j++) {
    string += generateTable(d, j+1)
  }
  return string
}

function generateTable(d, t) {
  table = "<table><tr>";
  for (i = 0; i < d.other.length; i++) {
    if (d.other[i][0].split(" ")[2].substring(0, 2) == "T" + String(t)) {
      table += "<th class='rotate-45'><div><span>" + d.other[i][0] + "</span></div></th>";
    }
  }
  table += "</tr><tr>";
  for (i = 0; i < d.other.length; i++) {
    if (d.other[i][0].split(" ")[2].substring(0, 2) == "T" + String(t)) {
      table += "<td>" + d.other[i][1] + "</td>";
    }
  }
  table += "</tr></table>";
  return table
}

function start() {
  parseCSV();
  console.log(scores.length);
  for (j = 0; j < scores.length; j++) {
    console.groupCollapsed("Adding pupil: " + j);
    addPupil(scores[j]);
    console.groupEnd();
  }
  console.log(dataset);
  makeTable();
  document.getElementById("output").style.display="";
  document.getElementById("dataStore").style.display="none";
  document.getElementById("button").style.display="none";
}
 
function makeTable(){
  $(document).ready(function() {
      var table = $('#output').DataTable( {
          "data": dataset,
          "columns": [
              {
                  "className":      'details-control',
                  "orderable":      false,
                  "data":           null,
                  "defaultContent": ''
              },
              { "data": "gender" },
              { "data": "fname" }, //TODO: surname
              { "data": "tutor" },
              { "data": "band" }
          ],
          "order": [[2, 'asc']]
      } );
       
      // Add event listener for opening and closing details
      $('#output tbody').on('click', 'td.details-control', function () {
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
}