var drawer = new tabris.Drawer();

new tabris.PageSelector().appendTo(drawer);
var NewsPage = require('./pages/NewsPage').create();
var SettingsPage = require('./pages/SettingsPage');


var button = new tabris.Button({
  text: "Reload"
}).on('select', loadData).appendTo(NewsPage);

var scrollView = new tabris.ScrollView({
  left: 0, right: 0, top: "10%", bottom: "0"
}).appendTo(NewsPage);

function createTextView(text) {
  new tabris.TextView({
    text: text,
    markupEnabled: true,
    layoutData: {left: 16, right: 16, top: 'prev() 12'},
    class: 'locationData'
  }).appendTo(scrollView);
}

// Send the GET request to get the data
function loadData () {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.status == 200) {
      console.log(this.responseText);
      var res = JSON.parse(this.responseText);
      for (var prop in res) {
        createTextView(prop + ": " + res[prop])
      }

    }
  };
  xmlhttp.open("GET", "http://ip-api.com/json", true);
  xmlhttp.send();

}
SettingsPage.create();

NewsPage.open();