function unpackSession(a, b) {
    a.start *= 1E3;
    a.stop *= 1E3;
    a.allotted *= 1E3;
    a.duration *= 1E3;
    a.surplus *= 1E3;
    for (var c in a.types) a.types[c][1] *= 1E3, a.types[c][2] *= 1E3;
    !a.task || 13415328E5 <= a.task.acquire || (a.task.acquire *= 1E3);
    a.data && a.data.note && (a.note = a.data.note, delete a.data);
    b && (a.sid = b)
}

function extract()
{
    var file = document.getElementById("fileinput").files[0];

    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function() 
    {
        var encoded = reader.result;

        if (encoded.indexOf("RA,") != 0)
        {
            document.getElementById("output").innerHTML = "Invalid file type";
            return;
        }
        var decompressed = LZString.decompressFromBase64(encoded.substr(3)),
            JSONparsed = JSON.parse(decompressed);
            document.getElementById("sessions").innerHTML = Object.keys(JSONparsed.sessions).length.toString();

            for (var n in JSONparsed.sessions) unpackSession(JSONparsed.sessions[n], n);
            return;
    }
    //document.getElementById("output").innerHTML = res;
}
$.ajax({
    url: "https://content.dropboxapi.com/2/files/download",
    type: "POST",
    beforeSend: function(a) {
        a.setRequestHeader("Authorization", "Bearer " + c);
        a.setRequestHeader("Dropbox-API-Arg", JSON.stringify(d))
    },
    success: function(a, c) {
        try {
            if (0 != a.indexOf("RA,")) throw {
                message: "Invalid file type"
            };
            var d = LZString.decompressFromBase64(a.substr(3)),
                e = JSON.parse(d);
            console.log("Importing " + Object.keys(e.sessions).length + " session(s) from " + e.creator);
            for (var n in e.sessions) Storage.unpackSession(e.sessions[n], n);
            Storage.addSessions(e.sessions);
            b({
                result: {
                    adds: Object.keys(e.sessions).length
                }
            })
        } catch (q) {
            b({
                error: q && q.message
            })
        }
    },
    error: function(a, c, d) {
        console.log("errorThrown = " + d);
        b({
            error: "Error: " + d
        })
    }
});
