import { TanStackDataTable } from "../custome/TanstackTable";
import { columns } from "./invoiceColumns";

interface Props {
  data: any;
}

const InvoiceTable = ({ data }: Props) => {
  return data ? (
    <div className="pt-5">
      {data && (
        <TanStackDataTable
          columns={columns}
          data={data}
          pageTitle="Subscription History"
          searchField="number"
        />
      )}
    </div>
  ) : (
    <div className="m-5 h-96 flex flex-col items-center justify-center border rounded-lg">
      <p>No invoices available</p>
    </div>
  );
};

export default InvoiceTable;
