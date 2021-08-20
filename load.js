if (document.body.getAttribute("schtroumpfix") === "activated") {
  console.log("schtroumpfix is already activated");
} else {
  document.body.setAttribute("schtroumpfix", "activated");
  console.log("activating schtroumpfix");
  $.getScript(
    "https://git.dev.juniorisep.com/interne/schtroumpfix/schtroumpfix/-/blob/master/schtroumpfixTest.js"
  )
    .done(function (script, textStatus) {
      console.log(textStatus);
      console.log("schtroumpfix has been activated");
    })
    .fail(function (jqxhr, settings, exception) {
      console.log("failed to activate schtroumpfix");
    });
}
