// static/js/scripts.js

$(document).ready(function() {
    $('.star-btn').click(function() {
        var btn = $(this);
        var ideaId = btn.data('id');
        $.ajax({
            url: '/ideas/' + ideaId + '/toggle_star',
            type: 'POST',  // Correct the type to POST since you are modifying data
            success: function(response) {
                if (response.starred) {
                    btn.children('i').removeClass('ri-star-line').addClass('ri-star-fill');
                } else {
                    btn.children('i').removeClass('ri-star-fill').addClass('ri-star-line');
                }
            }
        });
    });
    

    $('.interest-btn').click(function() {
        var btn = $(this);
        var ideaId = btn.data('id');
        var action = btn.data('action');
        $.ajax({
            url: '/ideas/' + ideaId + '/change_interest/',
            type: 'POST',
            data: {
                'action': action,
                'csrfmiddlewaretoken': '{{ csrf_token }}'  // Ensure csrf_token is available in the template
            },
            success: function(response) {
                $('#interest-' + ideaId).text(response.interest);
            }
        });
    });
    
});



$(document).ready(function() {
    $('#search-form').submit(function(event) {
        event.preventDefault();  // Prevent default form submission
        var query = $('#search-input').val().trim();  // Get search query
        searchIdeas(query);  // Call function to perform AJAX search
    });
});

function searchIdeas(query) {
    $.ajax({
        url: '/ideas/search/',
        type: 'GET',
        data: {
            'q': query
        },
        success: function(response) {
            $('#ideas-container').html(response);  // Update ideas container with new data
        }
    });
}