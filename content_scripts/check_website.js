(function() {
  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
   if (window.hasRun) {
    return;
  }
  // load jquery library
  window.hasRun = true;
  (function(){
    var newscript = document.createElement('script');
    newscript.type = 'text/javascript';
    newscript.async = true;
    newscript.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js';
    (document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(newscript);
  })();

  // (function() {
  //   document.getElementById("check_website").click();
  // })();

  /**
   * Listen for messages from the background script.
   * Call "beastify()" or "reset()".
   */
   browser.runtime.onMessage.addListener((message) => {
    if (message.command === "check_website") 
    {
      // alert("In");
      // insertBeast(message.beastURL);
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "http://127.0.0.1/BSafe/main.php", true);
      xhr.onreadystatechange = function() 
      {
        // result from php returned here
        if(xhr.readyState == 4 && xhr.status == 200) 
        {
          console.log(xhr.responseText);
          // if result is ok then change "Check if website is malicious to website is safe showing reset option using javascript"
        }
      }
      var url2 = document.location.href;
      // console.log(url2);
      var data = {"url":url2};
      data = JSON.stringify(data);
      // console.log(data);
      xhr.send(data);
    }
    // reset to check again
    else if (message.command === "reset") 
    {
    // removeExistingBeasts();
    }
});

 })();