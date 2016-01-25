$(document).ready(function() {
    var table = $('#music').DataTable();
    // Sort by date and then re-draw
    table
        .order( [ 0, "desc" ] )
        .draw();
} );

$(document).ready(function() {
     var table = $('#metacritic').DataTable();
    // Sort by date and then re-draw
    table
        .order( [ 0, "desc" ] )
        .draw();
} );

$(document).ready(function() {
    var table = $('#pitchfork').DataTable();
    // Sort by column 1 and then re-draw
    table
        .order( [ 0, "desc" ] )
        .draw();
} );