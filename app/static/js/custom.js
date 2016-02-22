function sortTables() {

    jQuery(document).ready(function() {
        var table = jQuery('#music').DataTable();
        // Sort by date and then re-draw
        table
            .order( [ 0, "desc" ] )
            .draw();
    } );

    jQuery(document).ready(function() {
         var table = jQuery('#metacritic').DataTable();
        // Sort by date and then re-draw
        table
            .order( [ 0, "desc" ] )
            .draw();
    } );

    jQuery(document).ready(function() {
        var table = jQuery('#pitchfork').DataTable();
        // Sort by column 1 and then re-draw
        table
            .order( [ 0, "desc" ] )
            .draw();
    } );
}

sortTables();

function getReviewerData() {

    var deferredData = new jQuery.Deferred();

    jQuery.ajax({
        type: "GET",
        url: "/get_reviewer_data",
        dataType: "json",
        success: function(data) {
            deferredData.resolve(data);
            },
        complete: function(xhr, textStatus) {
            console.log("AJAX Request complete -> ", xhr, " -> ", textStatus);
            }
    });

    return deferredData; // contains the passed data
};
