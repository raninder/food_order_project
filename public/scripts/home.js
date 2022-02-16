$(document).ready(function() {
	$("#home").click(() => {
    const url = "/users";
  $.ajax({
    url: url,
    method: 'GET',
  })
  })
})
