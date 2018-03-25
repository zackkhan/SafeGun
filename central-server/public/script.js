var pageIndex = 0;

function renderPage(){
  if (pageIndex==pages.length-1){$('#downarrow').hide();}else{$('#downarrow').show();}
  $('#viewbox').hide().fadeIn(750);
  $('#main').html(pages[pageIndex]['html']);
  $(('#title_'+pageIndex)).toggleClass('active');
  if(pages[pageIndex].hasOwnProperty('color')){
    renderColor(pages[pageIndex]['color']);
  }else{
    renderColor('primary');
  }
}

function createLinks(){
  for (var i= 0; i < pages.length; i++){
    if (pages[i].hasOwnProperty('title')){
      $('#header').append("<a class='head-link' href='#' id='title_"+i+"' >"+pages[i]['title']+"</a>");
    }
  }
}
$(window).ready(function(){
  $('#downarrow').on("click",function(){
    renderNextPage();
  });
});

$(window).ready(function(){
  $('.head-link').on("click",function(){
    renderPageByIndex($(this).attr('id').split('_')[1]);
  });
});
function renderPageByIndex(index){
  $(('#title_'+pageIndex)).toggleClass('active');
  pageIndex=index;
  renderPage();
}
function renderNextPage(){
  if (pageIndex<pages.length-1){
    $(('#title_'+pageIndex)).toggleClass('active');
    pageIndex++;
    renderPage();
  }
}

function renderPrevPage(){
  if (pageIndex>0){
    $(('#title_'+pageIndex)).toggleClass('active');
    pageIndex--;
    renderPage();
  }
}

function removeColors(){
  $('#container').removeClass('primary');
  $('#container').removeClass('default');
  $('#container').removeClass('info');
  $('#container').removeClass('warning');
  $('#container').removeClass('danger');
  $('#container').removeClass('secondary');
  $('#container').removeClass('dark');
  $('#container').removeClass('light');
}

function renderPrimary(){
  removeColors();
  $('#container').addClass('primary');
}

function renderSecondary(){
  removeColors();
  $('#container').addClass('secondary');
}

function renderSuccess(){
  removeColors();
  $('#container').addClass('success');
}

function renderInfo(){
  removeColors();
  $('#container').addClass('info');
}

function renderWarning(){
  removeColors();
  $('#container').addClass('warning');
}

function renderDanger(){
  removeColors();
  $('#container').addClass('danger');
}

function renderDark(){
  removeColors();
  $('#container').addClass('dark');
}

function renderLight(){
  removeColors();
  $('#container').addClass('light');
}

function renderRandom(){
  var colorStates=['default','primary','warning','danger','info','secondary','dark','light'];
  removeColors();
  $('#container').addClass(colorStates[Math.floor(Math.random()*colorStates.length)]);
}
function renderColor(color){
  var colorStates=['default','primary','warning','danger','info','secondary','dark','light'];
  removeColors();
  if (colorStates.includes(color)){
    $('#container').addClass(color);
  }else{
    $('#container').addClass('primary');
  }
}

$(window).ready(function(){
  $(window).bind('wheel', function(e){
    if(e.originalEvent.deltaY > 0){
      renderNextPage();
    }
    else{
      renderPrevPage();
    }
  })
  $(window).delay(200);
});

/*
$(document).ready(function(){
  $('#downarrow').on('click',renderNextPage());
});
*/

createLinks();
renderPage();//Render the first page
