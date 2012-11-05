sortablejs
==========

Very simple and easy to markup client-side sorting of HTML tables using javascript.

Dependancies
------------
- jQuery - [http://jquery.com/](http://jquery.com/ "jQuery")

Usage
-----
- Simply add the class "sortable" to any table column you wish to be sortable.
- By default sortablejs will use the text content of the td to sort by (alphabetical) if you wish to use a different value or the content of the td is not simple,  set the attribute 'data-sortable-key'.
- Ensure that you use full HTML tables including thead, th and tbody.
- Implement the appropriate CSS classes to give the table headings a sortable look-and-feel.

Example
-------

### HTML

    <table>
      <thead>
        <tr>
          <th class="sortable">First Name</td>
          <th class="sortable">Last Name</td>
          <th class="sortable">Date of Birth</td>
          <th>Options</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Joe</td>
          <td>Bloggs</td>
          <td data-sortable-key="19920511">11-05-1992</td>
          <td>Delete</td>
        </tr>
        <tr>
          <td>Joe</td>
          <td>Bloggs</td>
          <td data-sortable-key="19871195">05-11-1987</td>
          <td>Delete</td>
        </tr>
      </tbody>
    </table>

### CSS

    .sortable {
      text-decoration: underline;
    }

    .sortable:hover {
      cursor: pointer;
    }

    .sortable.ascending:after {
      content: url(../img/sort-asc.png);
      padding-left: 2px;
    }

    .sortable.descending:after {
      content: url(../img/sort-desc.png);
      padding-left: 2px;
    }
