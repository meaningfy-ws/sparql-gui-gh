// from an example at https://gist.github.com/LaurensRietveld/eebde750f87c52cdfa58
var consumeUrl = function(yasqe, args) {

  //change query and endpoint value if there are any
  if (args.query) yasqe.setValue(args.query);
  if (args.endpoint) {
    yasqe.options.sparql.endpoint = args.endpoint;
  } else {
    yasqe.options.sparql.endpoint = "http://zbw.eu/beta/sparql/stwv/query";
  }

  //want to consume other arguments such as the request type (POST/GET), or arguments to send to endpoint
  //feel free to add them in this function as well.
  //as you see, all options you can specify in the default settings, are configurable via yasqe.options as well

  //Or, if you want to configure yasqe via a remote url (e.g. a query in some file elsewhere),
  //feel free to do so!
  //This example uses a cors proxy to access a github file containing a query
  var queryReferenceURI = function () {
    if (args.queryRef) {
      return args.queryRef;
    } else {
      return "https://api.github.com/repos/jneubert/skos-history/contents/sparql/version_overview.rq";
    }
  }
  $.get(queryReferenceURI(), function(data) {
    yasqe.setValue(atob(data.content));
    yasqe.query();
  });
};
 
var yasqe = YASQE(document.getElementById("yasqe"), {
  sparql: {
    showQueryButton: true
  },
  consumeShareLink: consumeUrl
});


var yasr = YASR(document.getElementById("yasr"), {
  //this way, the URLs in the results are prettified using the defined prefixes in the query
  getUsedPrefixes: yasqe.getPrefixesFromQuery
});
 
/**
* Set some of the hooks to link YASR and YASQE
*/
yasqe.options.sparql.handlers.success = function(data, textStatus, xhr) {
  yasr.setResponse(
    {response: data, contentType: xhr.getResponseHeader("Content-Type")}
  );
};
yasqe.options.sparql.handlers.error = function(xhr, textStatus, errorThrown) {
  var exceptionMsg = textStatus + " (response status code " + xhr.status + ")";
  if (errorThrown && errorThrown.length) exceptionMsg += ": " + errorThrown;
  yasr.setResponse({exception: exceptionMsg});
};
