import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React from "react";

const TableCustom = React.forwardRef(
  ({ headers, data, renderColumn, onClick }, ref) => {
    const [completeDataSet, setCompleteSet] = React.useState([]);

    const [options, setOptions] = React.useState({
      pagina: 0,
      itemsPerPage: 5,
    });

    const updatePage = (page) =>
      setOptions((prevState) => {
        return { ...prevState, pagina: page };
      });

    const updateItemsPerPage = (itemsPerPage) =>
      setOptions((prevState) => {
        return { ...prevState, itemsPerPage: itemsPerPage };
      });

    const handleChangePage = (e, newPage) => {
      console.log(newPage);
      updatePage(newPage);
    };
    const handleChangeItemsPerPage = (e) => {
      const value = parseInt(e.target.value, 10);
      updateItemsPerPage(value);
      updatePage(0);
    };

    React.useImperativeHandle(ref, () => ({
      resetPage: () => updatePage(0),
    }));

    React.useEffect(() => setCompleteSet(data), [data, headers, renderColumn]);

    return (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {headers.map((header, index) => {
                return (
                  <TableCell sx={{ fontWeight: "bold" }} key={index}>
                    {header.label}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {completeDataSet
              .slice(
                options.pagina * options.itemsPerPage,
                options.pagina * options.itemsPerPage + options.itemsPerPage
              )
              .map((elem, index) => {
                return (
                  <TableRow key={index} onClick={onClick ? () => onClick(elem) : undefined}>
                    {headers.map((header, index) => {
                      return (
                        <TableCell key={index}>
                          {renderColumn !== undefined &&
                          Object.keys(renderColumn).includes(header.value)
                            ? renderColumn[header.value](
                                elem.id,
                                elem[header.value],
                                elem
                              )
                            : elem[header.value]}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                align="center"
                rowsPerPageOptions={[5, 10, 15]}
                count={completeDataSet.length}
                rowsPerPage={options.itemsPerPage}
                page={options.pagina}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeItemsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    );
  }
);

export default TableCustom;
