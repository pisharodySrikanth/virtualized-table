## VirtualizedTable
A VirtualizedTable.

A virtualized table built using react-virtualized with additional support for rowspan, colspan and dynamic cell height.

## Usage

```javascript
import VirtualizedTable from 'virtualized-table';
        <VirtualizedTable />
```

## Properties

**cellRenderer**

Required. Will get single cell data as input and must return the corresponding for the cell

```
function
```

**headerData**

Data to render the header. Expects an array of rows to render. Each row will be an array of columns. Each column will be an object. The data structure to be similar to the way table is rendered in HTML Defaults to `[]`.

```
array
```

**data**

Required. Data to render the body. Expects an array of rows to render. Each row will be an array of columns. Each column will be an object. The data structure to be similar to the way table is rendered in HTML

```
array
```

**scrollContainer**

Required. The table container on which overflow auto is applied. The header will stick with respect to this node

```
{
  current: node
}
```

**minRowHeight**

The minimum height a row of the table should have. Defaults to `50`.

```
number
```

**minColumnWidth**

The minimum width a column of the table should have. Defaults to `120`.

```
number
```

**fixedColumnCount**

The number of starting columns which will be fixed.

```
number
```

**cacheKeyMapper**

Optimization function passed to the react-virtualized CellCache. Helps the cache to skip calculating the height of cells.

```
function
```

**cellRangeRenderer**

Gets the params of the react-virtualized cellRangeRenderer and the defaultCellRangeRenderer. Used for optimization purposes.

```
function
```
  
## Intrinsic element

```
div
```