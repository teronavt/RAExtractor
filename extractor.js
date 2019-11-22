function extract()
{
    var files = document.getElementById("fileinput").files;
    var sfile = files.size;
    document.getElementById("fileSize").innerHTML = sfile;
}