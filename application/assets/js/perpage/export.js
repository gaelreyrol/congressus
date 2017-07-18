/*
	Copyright 2017 Nino Treyssat-Vincent, Parti Pirate

	This file is part of Congressus.

    Congressus is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    Congressus is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Congressus.  If not, see <http://www.gnu.org/licenses/>.
*/
if (template=="pdf"){
  $('#export_iframe').attr("src", export_area_url);
  $('#export_iframe').show();
  $("#export_area").hide();
} else {
  $.get(export_area_url, function(data){
    $("#export_area").empty().append(data);
    $('#export_iframe').hide();
    $("#export_area").show();
  });
}

$('.btnTab').click(function(){
  tab = $(this).data("tab");
  template = $(this).data("template");
  if (tab=='rendering'){
    textarea = 'false';
    $('#html-code').removeClass('btn-active');
    $('#html-code').removeClass('hidden-xs');
    $('#rendering').addClass('btn-active');
    $('#rendering').addClass('hidden-xs');
  } else if (tab=='html-code'){
    textarea = 'true';
    $('#html-code').addClass('btn-active');
    $('#html-code').addClass('hidden-xs');
    $('#rendering').removeClass('btn-active');
    $('#rendering').removeClass('hidden-xs');
  } else if (tab=='preview'){
    $('#preview').addClass('btn-active');
    $('#preview').addClass('hidden-xs');
    $('#send_discourse').removeClass('btn-active');
    $('#send_discourse').removeClass('hidden-xs');
    $('#discourse_post').hide();
    $("#export_area").show();
  } else if (tab=='send_discourse'){
    $('#preview').removeClass('btn-active');
    $('#preview').removeClass('hidden-xs');
    $('#send_discourse').addClass('btn-active');
    $('#send_discourse').addClass('hidden-xs');
    $('#discourse_post').show();
    $("#export_area").hide();
  }
  $.get("meeting/do_export.php", {template: template, id: meeting_id, textarea: textarea}, function(data){
    $("#export_area").empty().append(data);
    report = $(data).text();
  });
  $('#newpage').attr("href", url);
});

// closed by <span>X
$('.exportClose').click(function(){
  $("#exportModal").empty();
});

// Post
$( "#discourseSubmit" ).click(function( event ) {
  event.preventDefault();

  discourse_title = $('input[name="discourse_title"]').val();
  if (discourse_title.length > 15) {
    discourse_category = $('select[name="discourse_category"]').val();
    if (discourse_category !== "") {
      meetingId = meeting_id;
      url = "meeting_api.php?method=do_discoursePost";
      var posting = $.post( url, { discourse_title: discourse_title, discourse_category: discourse_category, meetingId: meetingId, report: report } );

    	posting.done(function( data ) {
    		var content = $(data);
    		$("#result").empty().append(content);
    	});
    } else {
      $("#result").empty().append("<div id='discourse-result' class='alert alert-danger' role='alert'>" + export_category_choose +"</div>");
    }
  } else {
    $("#result").empty().append("<div id='discourse-result' class='alert alert-danger' role='alert'>" + export_discourse_shortTitle +"</div>");
  }

});
