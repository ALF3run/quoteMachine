var quote = '';

$(document).ready(function () {
	/* Remove focus from the clicked button */
	$('button').click(function() {
		$(this).blur();
	});
	/* Toggle the popover when the #social-button is clicked */
	$('#social-button').click(function() {
		$('[data-toggle="popover"]').popover('toggle');
	});
    /* Generate the first quote */
    quoteCall();
    $('#quote-button').click(function () {
        /* General ajax method for making a request. All others jQuery methods use it. It's pointing to */
        quoteCall();
    });
	
	/* Enable bootstrap popover */
	$('[data-toggle="popover"]').popover({
		/* This means that you have to write manually the code to toggle the popover. I've used it due to some issues with Safari */
        trigger: 'manual',
		/* This means that you can pass html tag to the popover */
		html: true,
		/* This is the content. I use a function so */
		content: function() {
			var links = '<ul class="list-inline"><li><a href="https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + quote + '" title="Twitter" target="_blank"><i class="fa fa-twitter-square"></i></a></li><li><a href="https://www.facebook.com/dialog/feed?app_id=1661527027450236&display=page&link=http://codepen.io/ALF3run/full/dGKwdq/&redirect_uri=https://www.facebook.com/&description=' + quote + '" title="Facebook" target="_blank"><i class="fa fa-facebook-square"></i></a></li><li><a href="https://plus.google.com/share?url=http://codepen.io/ALF3run/full/dGKwdq/" title="Google+" target="_blank"><i class="fa fa-google-plus-square"></i></a></li></ul>';
			return links
		},
		/* This line means that the popover need to adjust its size in relation with the body and not with its nearest parent. */
		container: 'body'
	});
});

var quoteCall = function () {
    $.ajax({
        /* Url of the server to ask */
        url: "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous",
        /* Method for request data. "post" can be used to send data to the server to be processed while "get" can only request data. */
        type: "post",
        /* How to format data */
        dataType: "json",
        /* An object of additional header key/value pairs to send along with requests using the XMLHttpRequest transport */
        headers: {
            "X-Mashape-Key": "LSWIetPYgCmshjktGy3I0okjAXcEp1BaPtQjsn782WvnwFnT26",
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json"
        },
        /* Function to be executed if the request fail */
        error: function (xhr, status, error) {
            $('#quote').html("<blockquote><p>Sorry, something went wrong.<br><small>The website</small></p></blockquote>").hide();
			$('#quote').fadeIn();
            console.log(status.toUpperCase() + ": " + error + ";\n" + xhr.responseJSON.message);
            return -1;
        },
        /* Function to be executed if the request succed */
        success: function (result) {
            $('#quote').html("<blockquote><p>" + result[0].quote + "<br><small>" + result[0].author + "</small></p></blockquote>").hide();
			$('#quote').fadeIn();
			quote = $('#quote p').text();
			
			$('[data-toggle="popover"]').popover().content;
			$('[data-toggle="popover"]').popover('hide');
			
            return 0;
        }
    });
}
