function jam(){
    setInterval(function(){
        var waktu = new Date();
        var jam   = document.getElementById('jam');
        var hours = waktu.getHours();
        var minutes = waktu.getMinutes();
        var seconds = waktu.getSeconds();

        if (waktu.getHours() < 10)
        {
         hours = '0' + waktu.getHours();
        }
        if (waktu.getMinutes() < 10)
        {
         minutes = '0' + waktu.getMinutes();
        }
        if (waktu.getSeconds() < 10)
        {
         seconds = '0' + waktu.getSeconds();
        }
        jam.innerHTML  = '<h2>' + hours + '</h2>';
        var spans      = jam.getElementsByTagName('h2');
    },1000);
}
jam();