# [React Table 7 - Hooks based library](https://thewidlarzgroup.com/react-table-7/)

# Table of Contents
- [React Table 7 - Hooks based library](#react-table-7---hooks-based-library)
- [Table of Contents](#table-of-contents)
  - [Project Setup](#project-setup)
  - [Prepare Data](#prepare-data)
  - [Define Columns](#define-columns)
  - [Table Rendering - useTable hook](#table-rendering---usetable-hook)

## Project Setup

```console
npm i react-table
```

**[⬆ back to top](#table-of-contents)**

## Prepare Data

```javascript
// app.js
import React, { useEffect, useState } from "react"

const App = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    const doFetch = async () => {
      const response = await fetch("https://randomuser.me/api/?results=100")
      const body = await response.json()
      const contacts = body.results
      console.log(contacts)
      setData(contacts)
    }
    doFetch()
  }, [])

  return <div>Hello</div>
}
```

**[⬆ back to top](#table-of-contents)**

## Define Columns

![](data-1.png)

```javascript
const columns = useMemo(
  () => [
    {
      Header: "Title",
      accessor: "name.title",
    },
    {
      Header: "First Name",
      accessor: "name.first",
    },
    {
      Header: "Last Name",
      accessor: "name.last",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "City",
      accessor: "location.city",
    },
  ],
  []
)
```

**[⬆ back to top](#table-of-contents)**

## Table Rendering - useTable hook

```javascript
// TableContainer.js
import React from "react"
import { useTable } from "react-table"

const TableContainer = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

  return (
    // If you're curious what props we get as a result of calling our getter functions (getTableProps(), getRowProps())
    // Feel free to use console.log()  This will help you better understand how react table works under the hood.
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default TableContainer
```

**[⬆ back to top](#table-of-contents)**