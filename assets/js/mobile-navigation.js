window.addEventListener("DOMContentLoaded", function () {
  (function ($) {
  "use strict";

  var nav = $("#site-nav");
  if (!nav.length) {
    return;
  }

  var button = nav.children("button");
  var visibleLinks = nav.children(".visible-links");
  var hiddenLinks = nav.children(".hidden-links");
  var mobileQuery = window.matchMedia("(max-width: 768px)");
  var wasMobile = false;

  function sortNavigationItems() {
    var items = hiddenLinks.children(".masthead__menu-item[data-nav-order]").get();
    items.sort(function (first, second) {
      return Number($(first).attr("data-nav-order")) - Number($(second).attr("data-nav-order"));
    });
    $.each(items, function (_, item) {
      hiddenLinks.append(item);
    });
    hiddenLinks.children(".language-switch--mobile").appendTo(hiddenLinks);
  }

  function moveToMobileMenu() {
    visibleLinks.children(".masthead__menu-item[data-nav-order]").each(function () {
      $(this).prependTo(hiddenLinks);
    });
    sortNavigationItems();
    button.removeClass("hidden").attr({
      "aria-expanded": "false",
      "aria-label": "Open navigation menu"
    });
    hiddenLinks.addClass("hidden");
    wasMobile = true;
  }

  function restoreDesktopMenu() {
    hiddenLinks.children(".masthead__menu-item[data-nav-order]").each(function () {
      $(this).appendTo(visibleLinks);
    });
    var items = visibleLinks.children(".masthead__menu-item[data-nav-order]").get();
    items.sort(function (first, second) {
      return Number($(first).attr("data-nav-order")) - Number($(second).attr("data-nav-order"));
    });
    $.each(items, function (_, item) {
      visibleLinks.append(item);
    });
    hiddenLinks.addClass("hidden");
    button.addClass("hidden").attr("aria-expanded", "false");
    wasMobile = false;
  }

  function normalizeNavigation() {
    if (mobileQuery.matches) {
      moveToMobileMenu();
    } else if (wasMobile) {
      restoreDesktopMenu();
    }
  }

  $(window).on("resize.mobileNavigation orientationchange.mobileNavigation", function () {
    window.setTimeout(normalizeNavigation, 0);
  });

  button.on("click.mobileNavigation", function () {
    if (mobileQuery.matches) {
      var isOpen = !hiddenLinks.hasClass("hidden");
      button.attr({
        "aria-expanded": String(isOpen),
        "aria-label": isOpen ? "Close navigation menu" : "Open navigation menu"
      });
    }
  });

  normalizeNavigation();
  }(window.jQuery));
});
