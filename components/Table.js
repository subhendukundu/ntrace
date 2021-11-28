import React from "react";
import styled from "@xstyled/styled-components";
import { useTable, useSortBy } from "react-table";

const TableContainer = styled.div`
  align-self: center;
  margin-bottom: 2.5rem;
  overflow-x: auto;
  width: 100%;
  animation: fadeInUp;
  animation-delay: 450ms;
  border-radius: 3px;
  font-size: 12px;
  margin-top: 1rem;
`;

const TableWrapper = styled.table`
  width: 100%;
`;

const TbodyTr = styled.tr`
  &:nth-child(odd) td {
    background-color: tableBodyCell;

    &:first-child {
      background-color: tableCell;
    }
  }
`;

const TheadTh = styled.th`
  background-color: tableCell;
  font-size: 13px;
  font-weight: 900;
  padding: 1.25rem 0.5rem 0.75rem;
  cursor: pointer;
  user-select: none;
  border-radius: 3px;
  color: gray;
  margin-bottom: 0.25rem;
`;

const Td = styled.td`
  background-color: tableCell;
  font-size: 13px;
  font-weight: 600;
  padding: 1.25rem 0.5rem 0.75rem;
  border-radius: 3px;
  color: gray;
  margin-bottom: 0.25rem;
`;

export default function Table({ columns, data }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    );

  return (
    <TableContainer>
      <TableWrapper {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, i) => (
            <tr
              key={headerGroup.getHeaderGroupProps().key}
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) => (
                <TheadTh
                  key={column.getHeaderProps(column.getSortByToggleProps()).key}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  <span>{column.render("Header")}</span>
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </TheadTh>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <TbodyTr key={row.getRowProps().key} {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <Td key={cell.getCellProps().key} {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </Td>
                  );
                })}
              </TbodyTr>
            );
          })}
        </tbody>
      </TableWrapper>
    </TableContainer>
  );
}
