var AVAILABLE_ID_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
var SORTABLE_ID_ATTR_NAME = 'data-sortable-id';
var SORTABLE_DATA_ATTR_NAME = 'data-sortable-key';
var CLASS_SORTABLE = 'sortable';
var CLASS_ASCENDING = 'ascending';
var CLASS_DESCENDING = 'descending';


var sortablejs = {
  sortableColumns: {}

, generateColumnId: function() {
    var id = '';

    for (var i = 0; i < 5; i++) {
      id += AVAILABLE_ID_CHARS.charAt(Math.floor(Math.random() * AVAILABLE_ID_CHARS.length));
    } 

    if (sortablejs.sortableColumns[id] != undefined) {
      id = sortablejs.generateColumnId();
    }

    return id;
  }

, init: function() {
    $('.' + CLASS_SORTABLE).each(function() {
      var sortableId = sortablejs.generateColumnId();
      var sortableIndex = $(this).index();
      $(this).attr(SORTABLE_ID_ATTR_NAME, sortableId);

      sortablejs.bindSortEvent($(this));

      var listContent = [];

      $(this).parents('table').find('td').each(function() {
        if ($(this).index() == sortableIndex) {
          if ($(this).attr(SORTABLE_DATA_ATTR_NAME) == undefined) {
            listContent.push($(this).text().toLowerCase());  
          } else {
            listContent.push($(this).attr(SORTABLE_DATA_ATTR_NAME).toLowerCase());
          }
        }
      });

      sortablejs.sortableColumns[sortableId] = listContent;
    });
  }

, bindSortEvent: function(tableHeading) {
    tableHeading.click(function() {
      var table = tableHeading.parents('table');
      var sortableId = tableHeading.attr(SORTABLE_ID_ATTR_NAME);

      if (tableHeading.hasClass(CLASS_ASCENDING)) {
        // Sort descending
        sortablejs.sortDescending(table, sortableId);
      } else if (tableHeading.hasClass(CLASS_DESCENDING)) {
        // Remove sorting
        sortablejs.sortDefault(table, sortableId);
      } else {
        // Sort ascending
        sortablejs.sortAscending(table, sortableId);
      }
    });
  }

, resetSortedClasses: function(table) {
    table.removeClass(CLASS_ASCENDING);
    table.removeClass(CLASS_DESCENDING);
  }

, sortAscending: function(table, sortableId) {

    table.find('th').each(function() {
      if ($(this).attr(SORTABLE_ID_ATTR_NAME) == sortableId) {
        $(this).addClass(CLASS_ASCENDING);
      } else {
        sortablejs.resetSortedClasses($(this));
      }
    });
    var sortedList = sortablejs.sortableColumns[sortableId].slice().sort();
    sortablejs.orderTable(table, sortedList);
  }

, sortDescending: function(table, sortableId) {
    table.find('th').each(function() {
      if ($(this).attr(SORTABLE_ID_ATTR_NAME) == sortableId) {
        $(this).removeClass(CLASS_ASCENDING);
        $(this).addClass(CLASS_DESCENDING);
      } else {
        sortablejs.resetSortedClasses($(this));
      }
    });
    var sortedList = sortablejs.sortableColumns[sortableId].slice().sort().reverse();
    sortablejs.orderTable(table, sortedList);
  }

, sortDefault: function(table, sortableId) {
    table.find('th').each(function() {
      if ($(this).attr(SORTABLE_ID_ATTR_NAME) == sortableId) {
        $(this).removeClass(CLASS_DESCENDING);
      } else {
        sortablejs.resetSortedClasses($(this));
      }
    });
    var sortedList = sortablejs.sortableColumns[sortableId].slice();
    sortablejs.orderTable(table, sortedList);
  }

, orderTable: function(table, referenceList) {
    var previousTr;

    $.each(referenceList, function() {
      currentText = this;
      ///console.log('' + this);
      table.find('td').each(function() {
        var tdText;
        //console.log(currentText + ': ' + $(this).text());
        if ($(this).attr(SORTABLE_DATA_ATTR_NAME) == undefined) {
          tdText = $(this).text().toLowerCase();
        } else {
          tdText = $(this).attr(SORTABLE_DATA_ATTR_NAME).toLowerCase();
        }

        if (tdText == currentText) {
          if (previousTr == undefined) {
            previousTr = $(this).parent('tr');  
          } else {
            previousTr.after($(this).parent('tr'));  
            previousTr = $(this).parent('tr');
          }
        }
      });
    });
  }
};

!(function() {
  sortablejs.init();
} ());