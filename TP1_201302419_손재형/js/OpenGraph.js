function OpenGraph_view(index, url){

  var urlEncoded = encodeURIComponent(url); //url을 인코딩
  var apiKey ="5916a6c590c08ce224a16036"; //제 인증키 입니다.

  // The entire request is just a simple get request with optional query parameters
  var requestUrl = "https://opengraph.io/api/1.0/site/" + urlEncoded ;

  // If the apiKey is set then we build the URL like this!
  if(apiKey){
    requestUrl = "https://opengraph.io/api/1.0/site/" + urlEncoded + '?app_id=' + apiKey;
  }

  $.getJSON(requestUrl, function( json ) {

    // Throw the object in the console to see what it looks like!
    console.log('json', json);

    // Update the HTML elements!
    $('#title'+index).text(json.hybridGraph.title);
    $('#description'+index).text(json.hybridGraph.description);
    $('#icon'+index).attr('src', json.hybridGraph.image);

  });
}
