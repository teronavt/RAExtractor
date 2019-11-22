function extract()
{
    var files = document.getElementById("fileinput").files;
    var sfile = files[0].size;
    document.getElementById("fileSize").innerHTML = sfile;
}
