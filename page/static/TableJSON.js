var defaultTableAttributes = {
		"border" : "1"
};

/* Create a table */
function createTable(arrayObject , attributes) {

        var res = "";
        res +="<table";
        if (!attributes) {
                attributes  = defaultTableAttributes;
        }
        
        res+=getTableAttributes(attributes);
        res +=">";

        res += getTableHeaders(arrayObject[0]);
        arrayObject.forEach(function(row) {
                res += parseRow(row, res);
        });

        res+="</table>";        
	return res;
}
/* Create and return the table headers for the row in HTML format */
function getTableHeaders(row) {
        var res = "";
        
        for (var field in row) {
                res+="<th>" + field + "</th>\n";
        }

        return res;
}
        
/* Return the attributes in HTML format*/
function getTableAttributes(attributes) {
        if (!attributes) return "";
        var res = "";
        
        for (var attribute in attributes) {
                if (attributes.hasOwnProperty(attribute)) {
                        res += " " + attribute + '="' + attributes[attribute] + '" ';
                }
        }       
        return res;
}
/* Return the row in HTML format as a table data */
function parseRow(row, res) {
        columns = [];
        for (var key in row) {
                if (row.hasOwnProperty(key)) {
                        columns.push(row[key]);
                }
        }

        return generateTableRow(columns, res);
}

/* Return the row in HTML format as table data */
function generateTableRow(columns) {
        res = "";
        res +="<tr>";
        
        columns.forEach(function(column) {
                res += "<td>" + column + "</td>";
        });     

        res += "</tr>";

        return res;
}

