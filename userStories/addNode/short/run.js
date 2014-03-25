alert("commparing");
/* compare (expected, actual) */
compare("<abc>", "<abc>").then(function(response) {
    alert("Success!");
}, function(error) {
    alert("Failed!");
});
