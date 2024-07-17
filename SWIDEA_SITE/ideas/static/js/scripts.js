// static/js/scripts.js

$(document).ready(function() {
    $('.star-btn').click(function() {
        var csrftoken = document.querySelector("meta[name=csrf_token]").content
        var btn = $(this);
        var ideaId = btn.data('id');
        $.ajax({
            url: '/' + ideaId + '/toggle_star',
            type: 'POST', headers: {"X-CSRFToken": csrftoken}, // Correct the type to POST since you are modifying data
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
        var csrftoken = document.querySelector("meta[name=csrf_token]").content
        var btn = $(this);
        var ideaId = btn.data('id');
        var action = btn.data('action');
        $.ajax({
            url: '/' + ideaId + '/change_interest',
            type: 'POST', headers: {"X-CSRFToken": csrftoken},
            data: {
                'action': action,
                
            },
            success: function(response) {
                $('#interest-' + ideaId).text(response.interest);
            }
        });
    });
    
});


