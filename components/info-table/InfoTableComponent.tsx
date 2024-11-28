import { createContext, forwardRef, HTMLAttributes, useContext } from "react";
import { InfoTableProps } from "./InfoTableProps";
import { TableStoryblok } from "../../types/components-schema";

export const InfoTableContextDefault = forwardRef<
  HTMLTableElement,
  InfoTableProps & HTMLAttributes<HTMLTableElement>
>(({ data, ...props }, ref) => {
  const tableData = data as unknown as TableStoryblok;
  return (
    <table {...props} ref={ref}>
      {tableData.thead && tableData.thead.length > 0 && (
        <thead>
          <tr>
            {tableData.thead.map((th, index) => (
              <th key={index}>{th.value}</th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {tableData.tbody &&
          tableData.tbody.length > 0 &&
          tableData.tbody.map((tr, index) => (
            <tr key={index}>
              {tr.body.map((td, index) => (
                <td key={index}>{td.value}</td>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
  );
});
InfoTableContextDefault.displayName = "Info Table Context Default";

export const InfoTableContext = createContext(InfoTableContextDefault);
export const InfoTable = forwardRef<
  HTMLTableElement,
  InfoTableProps & HTMLAttributes<HTMLTableElement>
>((props, ref) => {
  const Component = useContext(InfoTableContext);
  return <Component {...props} ref={ref} />;
});
InfoTable.displayName = "Info Table";
