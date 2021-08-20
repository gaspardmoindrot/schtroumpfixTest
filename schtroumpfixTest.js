var SCHTROUMPFIX_API = "https://schtroumpfix.juniorisep.com";
var mainHeadContent = document.querySelector(
  "#main > div.main-content.clearfix > div"
);
var columnsAdds = document.querySelector(
  "#main > div.main-content.clearfix > aside"
);
var prospectListElements = document
  .querySelector("#listResults > ul")
  .getElementsByClassName("bi-bloc");

window.addEventListener("load", function () {
  if (document.body.getAttribute("schtroumpfix") === "activated") {
    console.log("schtroumpfix is already activated");
    return false;
  }

  document.body.setAttribute("schtroumpfix", "activated");
  console.log("schtroumpfix has been activated");

  var prospectListElements = document
    .querySelector("#listResults > ul")
    .getElementsByClassName("bi-bloc");

  changeIconToSchtroumpf();
  pressAllPhoneButton();
  console.log(scrapProspects(prospectListElements));
  getRidOfAdvertisements();
});

function pressAllPhoneButton() {
  var button;

  for (const prospectElement of prospectListElements) {
    button = prospectElement.querySelector(
      "div > footer > ul.barre-liens-contact > li.item.bi-contact-tel > span > a"
    );
    try {
      button.click();
    } catch (Exception) {}
  }
}

function getProspectPhone(prospectElement) {
  var test = prospectElement
    .querySelector("div > footer > ul.main-contact-container > li > div")
    .getElementsByTagName("div");
  var retour = [];

  for (let i = 0; i < test.length; i++) {
    if (
      test.item(i).innerText.includes("Tél") ||
      test.item(i).innerText.includes("Mobile")
    ) {
      retour.push(
        test
          .item(i)
          .innerText.slice(
            test.item(i).innerText.length - 15,
            test.item(i).innerText.length - 1
          )
      );
    }
  }

  return retour;
}

function getProspectAddress(prospectElement) {
  var test = prospectElement.querySelector(
    "div > header > div.main-adresse-container > div.adresse-container > a"
  );

  return test.innerText.slice(0, test.innerText.length - 20);
}

function getProspectName(prospectElement) {
  var test = prospectElement.querySelector(
    "div > header > div.row-denom > div.denomination > h3 > a"
  );

  return test.innerText.trim();
}

function getProspectCode(prospectElement) {
  var test = prospectElement.querySelector(
    "div > header > div.main-adresse-container > div.adresse-container > a"
  );

  retour = test.innerText.slice(0, test.innerText.length - 19).split(",");

  return retour[1].split(" ")[1];
}

function getProspectActivity(prospectElement) {
  var test = prospectElement.querySelector(
    "div > div.description > div.activites-mentions > a"
  );

  var retour = test.innerText.split(",");
  for (let i = 0; i < retour.length; i++) {
    retour[i] = retour[i].trim();
  }

  return retour;
}

function scrapProspects(prospectElements) {
  let prospects = [];

  for (const prospectElement of prospectElements) {
    nameProspect = getProspectName(prospectElement);
    phone = getProspectPhone(prospectElement);
    address = getProspectAddress(prospectElement);
    code = getProspectCode(prospectElement);
    activity = getProspectActivity(prospectElement);
    setInterface(prospectElement, nameProspect, phone, address, code, activity);
    prospects.push([nameProspect, phone, address, code, activity]);
  }

  return prospects;
}

function setInterface(
  prospectElement,
  nameProspect,
  phone,
  address,
  code,
  activity
) {
  //var mySpan = document.createElement("span");
  //mySpan.innerHTML = "replaced anchor!";
  //prospectElement.parentNode.replaceChild(mySpan, prospectElement);
  prospectElement.setAttribute("id", "prospectElement");

  var section = document.createElement("section");
  section.setAttribute("class", "schtroumpfixSection");

  /*var tag = document.createElement("p");
  tag.setAttribute("id", "testScrapping");
  var text = document.createTextNode("Tesssssssssssssssst");
  tag.appendChild(text);

  var tag2 = document.createElement("p");
  tag2.setAttribute("id", "cercle");

  //https://developer.mozilla.org/fr/docs/Web/HTML/Element/Input/checkbox

  var tag3 = document.createElement("div");
  var tag30 = document.createElement("input");
  tag30.setAttribute("type", "checkbox");
  tag30.setAttribute("id", "scales");
  tag30.setAttribute("name", "scales");
  tag30.setAttribute("checked", "");
  var tag31 = document.createElement("label");
  tag31.setAttribute("for", "scales");
  var text2 = document.createTextNode("Scales");
  tag31.appendChild(text2);
  tag3.appendChild(tag30);
  tag3.appendChild(tag31);

  // https://developer.mozilla.org/fr/docs/Web/HTML/Element/Button
  var tag4 = document.createElement("button");
  tag4.setAttribute("class", "favorite styled");
  tag4.setAttribute("type", "button");
  var text3 = document.createTextNode("Ajouter aux prospects");
  tag4.appendChild(text3);*/

  prospectElement.appendChild(section);
  //section.appendChild(tag);
  //section.appendChild(tag2);
  //section.appendChild(tag3);
  //section.appendChild(tag4);

  var sheet = window.document.styleSheets[0];
  sheet.insertRule("#testScrapping { color: red; }", sheet.cssRules.length);
  sheet.insertRule("#prospectElement { display: flex }");
  sheet.insertRule("#prospectElement > div { width: 600px }");
  sheet.insertRule(
    ".schtroumpfixSection { width: 340px ; background-color: #F7F7F7 ; border: solid; border-color: 0; border-width: 1px;" +
      "margin-left: 8px ; border-radius: 15px}"
  );

  var divHeader = document.createElement("div");
  var divMiddle = document.createElement("div");
  var divFooter = document.createElement("div");

  section.setAttribute("style", "display: flex; flex-direction: column;");
  section.appendChild(divHeader);
  section.appendChild(divMiddle);
  section.appendChild(divFooter);

  addHeader(divHeader);
  addMiddle(divMiddle);
  addFooter(divFooter);
}

function addFooter(divFooter) {
  divFooter.setAttribute(
    "style",
    "display:flex; justify-content: space-around;"
  );

  var buttonNoResponse = document.createElement("button");
  buttonNoResponse.setAttribute(
    "style",
    "width:120px; background-color:#F0F0F0; border:solid; border-color: #BBBBBB; border-width:1px; border-radius:8px"
  );
  var buttonRDV = document.createElement("button");
  buttonRDV.setAttribute(
    "style",
    "width:120px; background-color:#F0F0F0; border:solid; border-color: #BBBBBB; border-width:1px; border-radius:8px"
  );
  var buttonRefus = document.createElement("button");
  buttonRefus.setAttribute(
    "style",
    "width:120px; background-color:#F0F0F0; border:solid; border-color: #BBBBBB; border-width:1px; border-radius:8px"
  );

  var text1 = document.createTextNode("Pas de réponse");
  var text2 = document.createTextNode("RDV");
  var text3 = document.createTextNode("Refus");

  buttonNoResponse.appendChild(text1);
  buttonRDV.appendChild(text2);
  buttonRefus.appendChild(text3);

  divFooter.appendChild(buttonNoResponse);
  divFooter.appendChild(buttonRDV);
  divFooter.appendChild(buttonRefus);
}

function addMiddle(divMiddle) {
  var divMiddleInputText = document.createElement("input");
  divMiddleInputText.setAttribute("type", "text");
  divMiddleInputText.setAttribute(
    "style",
    "height: 80px ; width: 320px; margin: 10px"
  );

  divMiddle.appendChild(divMiddleInputText);
}

function addHeader(divHeader) {
  divHeader.setAttribute("style", "display: flex; flex-direction: row;");
  addCircle(divHeader);

  var divHeaderRight = document.createElement("div");
  divHeaderRight.setAttribute(
    "style",
    "display: flex; flex-direction: column;"
  );
  addTimeLastCall(divHeaderRight);
  addPlaquetteAndRappel(divHeaderRight);

  divHeader.appendChild(divHeaderRight);
}

function addPlaquetteAndRappel(divHeaderRight) {
  var divHeaderRightDown = document.createElement("div");
  divHeaderRightDown.setAttribute(
    "style",
    "display: flex; justify-content: space-around;"
  );

  var divPlaquette = document.createElement("div");
  var plaquette = document.createElement("input");
  plaquette.setAttribute("type", "checkbox");
  plaquette.setAttribute("id", "plaquette");
  plaquette.setAttribute("style", "margin: 5px");
  var plaquetteLabel = document.createElement("label");
  plaquetteLabel.setAttribute("for", "plaquette");
  var text = document.createTextNode("Plaquette");
  plaquetteLabel.appendChild(text);

  var divRappel = document.createElement("div");
  var rappel = document.createElement("input");
  rappel.setAttribute("type", "checkbox");
  rappel.setAttribute("id", "rappel");
  rappel.setAttribute("style", "margin: 5px");
  var rappelLabel = document.createElement("label");
  rappelLabel.setAttribute("for", "rappel");
  var text2 = document.createTextNode("Rappel");
  rappelLabel.appendChild(text2);

  divHeaderRightDown.appendChild(divPlaquette);
  divHeaderRightDown.appendChild(divRappel);

  divPlaquette.appendChild(plaquette);
  divPlaquette.appendChild(plaquetteLabel);
  divRappel.appendChild(rappel);
  divRappel.appendChild(rappelLabel);

  divHeaderRightDown.appendChild(divPlaquette);
  divHeaderRightDown.appendChild(divRappel);

  divHeaderRight.appendChild(divHeaderRightDown);
}

function addTimeLastCall(divHeaderRight) {
  var pTimeLastCall = document.createElement("p");
  pTimeLastCall.setAttribute(
    "style",
    "font-size: 12px; margin-top: 10px; margin-left: 5px"
  );
  var text = document.createTextNode("Appelé il y a : ");

  var strongText = document.createElement("strong");
  var text2 = document.createTextNode("2 mois et 3 jours");
  strongText.setAttribute("style", "font-weight: bold");
  strongText.appendChild(text2);

  var text3 = document.createTextNode(" par Marc P.");

  pTimeLastCall.appendChild(text);
  pTimeLastCall.appendChild(strongText);
  pTimeLastCall.appendChild(text3);
  divHeaderRight.appendChild(pTimeLastCall);
}

function addCircle(divHeader) {
  var tag2 = document.createElement("p");
  tag2.setAttribute("id", "cercle");

  var sheet = window.document.styleSheets[0];
  sheet.insertRule(
    "#cercle { height: 50px;" +
      "width: 50px;" +
      "background-color: #9BCE62;" +
      "border-radius: 50%;" +
      "margin: 4px } "
  );
  divHeader.appendChild(tag2);
}

function getRidOfAdvertisements() {
  columnsAdds.remove();
  mainHeadContent.style.maxWidth = "100%";
}

function changeIconToSchtroumpf() {
  const logo = SCHTROUMPFIX_API + "/schtroumpf.png";
  $(".logo")[0].src = logo;

  Array.from($("#head > link")).forEach((icon) => {
    if (icon.rel.endsWith("icon")) {
      icon.href = logo;
    }
  });
}
