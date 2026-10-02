$(document).ready(function () {
  /* Simulated search (search.html) */
  if ($("#search-results").length) {
    // Read the q value the form sent in the URL
    var params = new URLSearchParams(window.location.search);
    var searchTerm = params.get("q") || "";

    // Show the user what they searched for
    $("#search-term").text(searchTerm);

    // Case matching
    var keyphrase = searchTerm.trim().toLowerCase();

    // Decide which section to display
    switch (keyphrase) {
      case "bear bag":
        $("#search-results").show();
        break;
      default:
        $("#no-results").show();
    }
  }
  /* Interaction #1: claim shared gear (for trip-details.html only) */
  // Event delegation
  $("#shared-gear-list").on("click", ".claim-btn", function () {
    // Find the list item that holds the clicked button
    var $item = $(this).closest(".gear-item");
    var itemName = $item.find("label").text().trim();

    // Modify existing elements
    $item
      .find(".gear-claimed")
      .text("Claimed: You")
      .removeClass("gear-unclaimed");

    // Remove button once claimed
    $(this).remove();

    // Recount the unclaimed items
    var unclaimedCount = $("#shared-gear-list .claim-btn").length;
    var totalCount = $("#shared-gear-list .gear-item").length;
    $("#shared-status").text(unclaimedCount + "/" + totalCount + " unclaimed");

    // Confirmation message
    $("#shared-gear-list").after(
      '<p class="claim-message">You claimed the ' +
        itemName +
        ". Thanks for carrying it!</p>",
    );
  });

  /* Interaction #2: packing checklist (trip-details.html) */
  // Change whenever a personal checklist box is checked/unchecked
  $('#personal-gear-list input[type="checkbox"]').on("change", function () {
    // DOM traversal
    var $item = $(this).closest(".gear-item");
    var $list = $item.parent();
    var $status = $list.siblings(".column-status");

    if ($(this).is(":checked")) {
      // Adds "Packed" tag
      $item.append('<span class="packed-tag">Packed</span>');
    } else {
      // Takes off "Packed" tag
      $item.find(".packed-tag").remove();
    }

    // Update count
    var packedCount = $list.find("input:checked").length;
    var totalCount = $list.find(".gear-item").length;
    $status.text(packedCount + "/" + totalCount + " packed");
  });
});
