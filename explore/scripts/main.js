var activeFilter = 'all';
var video_info_dict = '';

function loadFile(filePath) {
  // alert(filePath)
  var result = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", filePath, false);
  xmlhttp.send();
  if (xmlhttp.status == 200) {
    result = xmlhttp.responseText;
  }
  var img_list = result.split('\n');
  return img_list;
}


$('.pp-filter-button').on('click', function (e) {
  // remove btn-primary from all buttons first
  $('.pp-filter-button').removeClass('btn-primary');
  $('.pp-filter-button').addClass('btn-outline-primary');

  // add btn-primary to active button
  var button = $(this);
  button.removeClass('btn-outline-primary');
  button.addClass('btn-primary');
  filterItemsAjax(button.data("filter"));
  // filterItemsAjax(button.data("filter"));

  e.preventDefault();
  document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
  });
})


function filterItemsAjax(filter) {
  if (filter === activeFilter) {
    return;
  }
  activeFilter = filter;
  // alert(filter.toLowerCase())
  image_list = loadFile('data/lists/' + filter.toLowerCase() + '.txt');
  $('.pp-gallery .card-columns').html("");
  // https://www.youtube.com/embed/BspouwCTXRo?start=76&end=120

  for (var i = 0; i < image_list.length; i++) {
    params = image_list[i].split(",")
    // img_block = "<div class='card' data-groups='[&quot;computer&quot;]'><a href='https://www.youtube.com/embed/"+params[0]+"+?start="+params[1]+"&end="+params[2]+"'> <figure class='pp-effect'><img class='img-fluid' src='https://img.youtube.com/vi/" + params[0] + "/mqdefault.jpg'/> <figcaption> <div class='h4'>Laptop</div> <p>Computer</p> </figcaption> </figure></a></div>"
    img_block = "<div class='card' data-groups='[&quot;computer&quot;]'><a href='https://youtu.be/"+params[0]+"+?t="+params[1]+"'> <figure class='pp-effect'><img class='img-fluid' src='https://img.youtube.com/vi/" + params[0] + "/mqdefault.jpg'/> <figcaption> <div class='h4'>Laptop</div> <p>Computer</p> </figcaption> </figure></a></div>"
    $('.pp-gallery .card-columns').append(img_block)
    // alert(image_list)
    // alert()
  }

}

function filterItems(filter) {
  // alert(filter);

  if (filter === activeFilter) {
    return;
  }

  image_list = loadFile('data/lists/' + filter + '.txt');

  activeFilter = filter;
  $('.pp-gallery .card').each(function () {
    var card = $(this);
    var groups = card.data("groups");
    var show = false;
    if (filter === 'all') {
      show = true;
    }
    else {
      for (var i = 0; i < groups.length; i++) {
        if (groups[i] === filter) {
          show = true;
        }
      }
    }
    // hide everything first
    card.fadeOut(400);

    setTimeout(function () {
      if (show && !card.is(":visible")) {
        card.fadeIn(400)
      }
    }, 500);
  });
}

