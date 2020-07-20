# [React Table 7 - Hooks based library](https://thewidlarzgroup.com/react-table-7/)

# Table of Contents
- [React Table 7 - Hooks based library](#react-table-7---hooks-based-library)
- [Table of Contents](#table-of-contents)
  - [Project Setup](#project-setup)
  - [Prepare Data](#prepare-data)
  - [Define Columns](#define-columns)

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