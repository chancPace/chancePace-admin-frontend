import { Table } from 'antd';
import { useRouter } from 'next/router';

interface DataType {
  key: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  tags: string[];
}
interface TableColumnProps {
  columns?: any;
  dataSource?: any;
}

const TableComponent = ({ columns, dataSource }: TableColumnProps) => {
  const router = useRouter();

  return (
    <Table<DataType>
      columns={columns}
      dataSource={dataSource}
      onRow={(record, rowIndex) => {
        return {
          onClick: (e) => {
            e.preventDefault();
            router.push('/user/userlist/userdetail/1');
          },
        };
      }}
    />
  );
};

export default TableComponent;
