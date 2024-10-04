function ajax_request(url = false, data = false, callback = false, callbackArgs = false) {
  var req = new XMLHttpRequest(),
      d = new Date(),
      n = d.getTime(),
      m = "POST",
      cink = 0;
      data_string = "";
  console.log({req, d, n, m, data, url});
  if(url && data) {
    var ajax_status = "";
    req.open(m, url, true);
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    req.onreadystatechange = function(e) {
      //if(req.readyState !== 4) return;
      //if(req.status === 200) console.log(req.responseText);
      console.log({e: e, m: m, status: req.status, text: req.statusText});
      if(req.status === 200) {
        if(callback) {callback(callBackArgs);}
        console.log('Sent!');
      } else {
        console.log("Something went wrong...");
      }
    };

    Object.keys(data).forEach((k, i) => {
      if(data[k] !== false && data[k] !== "") {
        data_string += k + '=' + data[k]; cink++;
        if(cink > 0 && i < Object.keys(data).length - 1) {data_string += "&";}
      }
    });
    console.log({data_string: data_string});
    req.send(data_string);
  } else {
    console.log('Not Sent!');
  }
}
