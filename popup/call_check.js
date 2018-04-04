/**
 * CSS to hide everything on the page,
 * except for elements that have the "beastify-image" class.
 */
 const hideCheck = `body > .btn-check {
  display: none;
}`;

const hideReport = `body > .btn-report {
  display: none;
}`;

/**
 * Listen for clicks on the buttons, and send the appropriate message to
 * the content script in the page.
 */

 function handleMessage(request, sender, sendResponse) {
  console.log("Message from the content script: " + request.command);
  if (request.command === "change_css_malicious") 
  {
    // console.log(document.getElementById("malicious"));
    document.getElementById("malicious").style.display="block";
  }
  if (request.command === "change_css_safe") 
  {
    // console.log(document.getElementById("safe"));
    document.getElementById("safe").style.display="block";
  }
  if (request.command === "change_css_reported") 
  {
    // alert("ouu");
    console.log(document.getElementById("reported"));
    document.getElementById("reported").style.display="block";
  }
}

browser.runtime.onMessage.addListener(handleMessage);

function listenForClicks() {
  document.addEventListener("click", (e) => {

    function check_website(tabs) {

      browser.tabs.sendMessage(tabs[0].id, {
        command: "check_website",
      });
    }

    function report_website(tabs) {
      // console.log("sss");
      var e = document.getElementById("sel1");
      var strUser = e.options[e.selectedIndex].text;
      // console.log(strUser);
      browser.tabs.sendMessage(tabs[0].id, {
        command: "report_website",
        string: strUser
      });
    }


    function reportError(error) {
      console.error(`Could not detect website: ${error}`);
    }

    /**
     * Get the active tab,
     * then call "check_website()" or "report_website()" as appropriate.
     */
     if (e.target.classList.contains("btn-check")) {
      browser.tabs.query({active: true, currentWindow: true})
      .then(check_website)
      .catch(reportError);
    }

    if (e.target.classList.contains("btn-report")) {
      browser.tabs.query({active: true, currentWindow: true})
      .then(report_website)
      .catch(reportError);
    }

  });
}

/**
 * There was an error executing the script.
 * Display the popup's error message, and hide the normal UI.
 */
 function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to execute beastify content script: ${error.message}`);
}

/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */
 browser.tabs.executeScript({file: "/content_scripts/check_website.js"})
 .then(listenForClicks)
 .catch(reportExecuteScriptError);
