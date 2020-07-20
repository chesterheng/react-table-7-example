import React, { useEffect, useState, useMemo } from "react"
import { Container } from "reactstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import TableContainer from "./TableContainer"
import { SelectColumnFilter } from './filters';

const App = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    const doFetch = async () => {
      const response = await fetch("https://randomuser.me/api/?results=100")
      const body = await response.json()
      const contacts = body.results
      setData(contacts)
    }
    doFetch()
  }, [])

  const columns = useMemo(
    () => [
      {
        Header: "Title",
        accessor: "name.title",
        disableSortBy: true,
        Filter: SelectColumnFilter,
        filter: 'equals', // by default, filter: 'text', but in our case we don't want to filter options like text, we want to find exact match of selected option.
        // disableFilters: true
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
      {
        Header: 'Hemisphere',
        Filter: SelectColumnFilter,
        filter: 'equals',
        accessor: (values) => {
          const { latitude, longitude } = values.location.coordinates;
          const first = Number(latitude) > 0 ? 'N' : 'S';
          const second = Number(longitude) > 0 ? 'E' : 'W';
          return first + '/' + second;
        },
        // we can also write code below as a separate React Component
        Cell: ({ cell }) => {
          const { value } = cell;

          const pickEmoji = (value) => {
            let first = value[0]; // N or S
            let second = value[2]; // E or W
            const options = ['⇖', '⇗', '⇙', '⇘'];
            let num = first === 'N' ? 0 : 2;
            num = second === 'E' ? num + 1 : num;
            return options[num];
          };

          return (
            <div style={{ textAlign: 'center', fontSize: 18 }}>
              {pickEmoji(value)}
            </div>
          );
        }
      },
    ],
    []
  )
  return (
    <Container style={{ marginTop: 100 }}>
      <TableContainer columns={columns} data={data} />
    </Container>
  )
}

export default App;