#tsorter


JavaScript Table Sorter using in-place QuickSort.

Full Details: 
[http://www.terrill.ca/sorting/](http://www.terrill.ca/sorting/)

Provide the table ID and initial sort column:

```
 var sorter = tsorter.create( tableID, initialSortColumn );
```

##Specifying Data Types

Different data types require different comparisons. Numbers in particular must be compared as numbers and not strings. To aid the script we can hint at the data type by specifying a `data-tsorter` attribute on the table header cell for each column. 

````
<thead>
    <tr>
         <th data-tsorter="numeric">Year</th>
         <th data-tsorter="numeric">Population</th>
         <th>Country</th>
    </tr>
</thead>
````

If the `data-tsorter` attribute is omitted it will default to string comparison. 

##Built in Data Types

| type | description  |
|-----|---|
|  numeric  | Treats the table cell value as an integer or float  |
| link | Parses the text content of a link tag inside the table cell |
| input | Parses an input tag's value inside the table cell |
| default | by default the textContent of the table cell is used and compared as text |

##Custom Data Accessor

It is possible to define your own data accessors. This is particularly useful when there is custom HTML inside a table cell. 

```
 var sorter = tsorter.create('table-id', null, {
     'image-number': function(row){  
         return parseFloat( this.getCell(row).childNodes[1].nodeValue, 10 );
     }
});
```

In the above example the 'image-number' type is now available to be used as a `data-tsorter` attribute value. It will access the text node that follows an image tag inside a cell. An example is available at [http://www.terrill.ca/sorting/table_sort_example.html](http://www.terrill.ca/sorting/table_sort_example.html).