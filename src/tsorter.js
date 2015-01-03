/*--------------------------------------------------------------*/
// HTML TABLE SORTER
// OBJECT ORIENTED JAVASCRIPT IMPLEMENTATION OF QUICKSORT
// @author  Terrill Dent 
// @source  http://www.terrill.ca
// @date    August 28th, 2006
/*--------------------------------------------------------------*/
var tsorter = (function()
{
    'use strict';

    if( !Object.create ){
        Object.create = function( prototype ) {
            var Obj = function(){return undefined;};
            Obj.prototype = prototype;
            return new Obj();
        };
    }

    var sorterPrototype = {

        getCell: function(row,col)
        {
            var that = this;
            return that.trs[row].cells[col];
        },

        /* SORT
         * Sorts a particular column. If it has been sorted then call reverse
         * if not, then use quicksort to get it sorted.
         * Sets the arrow direction in the headers.
         * @param oTH - the table header cell (<th>) object that is clicked
         */
        sort: function( e )
        {   
            var that = this,
                th = e.target,
                column = th.cellIndex;

            // TODO: make sure target 'th' is not a child element of a <th> 
            //  We can't use currentTarget because of backwards browser support
            //  IE6,7,8 don't have it.


            // set the data retrieval function for this column 
            that.get = that.getAccessor( th.abbr, column );

            if( that.prevSortCol === column )
            {
                // if already sorted, reverse
                th.className = th.className !== 'ascend' ? 'ascend' : 'descend';
                that.reverseTable();
            }
            else
            {
                // not sorted - call quicksort
                th.className = 'ascend';
                if( that.prevSortCol !== -1 && that.ths[that.prevSortCol].className !== 'exc_cell'){
                    that.ths[that.prevSortCol].className = '';
                }
                that.quicksort(0, that.trs.length);
            }
            that.prevSortCol = column;
        },
        
        /* 
         * Choose Data Accessor Function
         * @param: the html structure type (from the data-type attribute)
         */
        getAccessor: function(sortType, col)
        {
            var that = this;
            switch(sortType)
            {   
                case "image_number":
                    return function(row){  
                        return that.getCell(row, col).childNodes[1].nodeValue;
                    };
                case "link":
                    return function(row){
                        return that.getCell(row, col).firstChild.firstChild.nodeValue;
                    };
                case "input_text":
                    return function(row){  
                        return that.getCell(row, col).firstChild.value;
                    };
                case "number":
                    return function(row){  
                        return parseInt(that.getCell(row, col).firstChild.nodeValue, 10);
                    };
                default:
                    return function(row){  
                        return that.getCell(row, col).firstChild.nodeValue;
                    };
            }
        },

        /* Exchange
         * A complicated way of exchanging two rows in a table.
         * Exchanges rows at index i and j
         */
        exchange: function(i, j)
        {
            var that = this,
                tbody = that.tbody,
                trs = that.trs,
                tmpNode;

            if( i === j+1 ) {
                tbody.insertBefore(trs[i], trs[j]);
            } else if( j === i+1 ) {
                tbody.insertBefore(trs[j], trs[i]);
            } else {
                tmpNode = tbody.replaceChild(trs[i], trs[j]);
                if( !trs[i] ) {
                    tbody.appendChild(tmpNode);
                } else {
                    tbody.insertBefore(tmpNode, trs[i]);
                }
            }
        },
        
        /* 
         * REVERSE TABLE
         * Reverses a table ordering
         */
        reverseTable: function()
        {
            var that = this,
                i;

            for( i = 1; i < that.trs.length; i++ ) {
                that.tbody.insertBefore( that.trs[i], that.trs[0] );
            }
        },

        /*
         * QUICKSORT
         * @param: lo - the low index of the array to sort
         * @param: hi - the high index of the array to sort
         */
        quicksort: function(lo, hi)
        {
            var i, j, pivot,
                that = this,
                get = that.get;

            if( hi <= lo+1 ){ return; }
             
            if( (hi - lo) === 2 ) {
                if(get(hi-1) > get(lo)) {
                    that.exchange(hi-1, lo);   
                }
                return;
            }
            
            i = lo + 1;
            j = hi - 1;
            
            if( get(lo) > get( i) ){ that.exchange( i, lo); }
            if( get( j) > get(lo) ){ that.exchange(lo,  j); }
            if( get(lo) > get( i) ){ that.exchange( i, lo); }
            
            pivot = get(lo);
            
            while(true) {
                j--;
                while(pivot > get(j)){ j--; }
                i++;
                while(get(i) > pivot){ i++; }
                if(j <= i){ break; }
                that.exchange(i, j);
            }
            that.exchange(lo, j);
            
            if((j-lo) < (hi-j)) {
                that.quicksort(lo, j);
                that.quicksort(j+1, hi);
            } else {
                that.quicksort(j+1, hi);
                that.quicksort(lo, j);
            }
        },

        init: function( table, initialSortedColumn ){
            var that = this,
                sort,
                i;

            if( typeof table === 'string' ){
                table = document.getElementById(table);
            }

            that.table = table;
            that.tbody = table.tBodies[0];
            that.ths = table.getElementsByTagName("th");
            that.trs = table.tBodies[0].getElementsByTagName("tr");
            that.prevSortCol = ( initialSortedColumn && initialSortedColumn > 0 ) ? initialSortedColumn : -1;

            sort = function(e){
                that.sort(e);
            };

            for( i = 0; i < that.ths.length; i++ ) {
                // TODO: use event listener
                that.ths[i].onclick = sort;
            }
        }

        // Add a destroy function to unbind click handlers
    };

    // Create a new sorter given a table element
    return {
        create: function( table )
        {
            var sorter = Object.create( sorterPrototype );
            sorter.init( table );
            return sorter;
        }
    };
}());
