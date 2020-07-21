(function() {
  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
   if (window.hasRun) {
    return;
  }

  // Load jquery library
  window.hasRun = true;
  (function(){
    var newscript = document.createElement('script');
    newscript.type = 'text/javascript';
    newscript.async = true;
    newscript.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js';
    (document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(newscript);
  })();

  /**
   * Listen for messages from the background script.
   */
   browser.runtime.onMessage.addListener((message) => {
    if (message.command === "check_website") 
    {
      var flag = 0;
      // alert("In");
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "http://127.0.0.1/BSafe/main.php", true);
      xhr.onreadystatechange = function() 
      {
        // Result from php returned here
        if(xhr.readyState == 4 && xhr.status == 200) 
        {
          flag++;
          console.log(xhr.responseText);
          var obj = JSON.parse(xhr.responseText);
          console.log(obj["result"]);

          /** 
           * If result is ok then display safe or malicious
           */

           if (obj["result"] == "ok")
           {
            browser.runtime.sendMessage(
            {
              command: "change_css_safe",
            });
          }
          else if (obj["result"] == "phishing")
          {
            browser.runtime.sendMessage(
            {
              command: "change_css_phishing",
            });
          }
          else if (obj["result"] == "malicious")
          {
            browser.runtime.sendMessage(
            {
              command: "change_css_malicious",
            });
          }
        }
        else
        {
          if (flag != 0)
          {
            browser.runtime.sendMessage(
            {
              command: "change_css_malicious",
            });
            console.log("ERROR");
          }
        }
      }

      var url2 = document.location.href;
      var data = {"url":url2};
      data = JSON.stringify(data);
      xhr.send(data);
    }
    if (message.command === "report_website") 
    {
      // Add AJAX to report website to safebrowsing with url
      
      var url2 = document.location.href;

      // alert("Please report website on " + message.string + ". Thankyou! ");
      alert("Please report website in the tab opened. Thankyou! ");
      console.log(message.string);
      
      browser.windows.create({
        url: message.string,
      });
    
    }

  });

 })();