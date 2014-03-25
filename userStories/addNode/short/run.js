alert("comparing");
/* compare (expected, actual) */
compare("<abc></abc>", "<abc></abc>").then(function(response) {
    alert("Success!");
}, function(error) {
  alert("Failed!");
});
