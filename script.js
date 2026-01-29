$(document).ready(function(){
    $("#importAllBtn").click(function(){
        const file= document.getElementById("fileInput").files[0];
        const datas = new FormData();
        datas.append("file", file);
        $.ajax({
            url:"service/fileupload.php",
            method:"post",
            contentType: false,
            processData:false,
            data: datas, 
            success:function(data){
                if(data == "ok"){
                      alert("import file")
                }else{
                    alert("file importation error")
                }
            }
        });
    });
 });
