import React, { useContext, useEffect, useMemo, useState } from 'react';
// import MaterialReactTable, { Column } from 'material-react-table';
import { Button } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { MaterialReactTable, MRT_ColumnDef} from 'material-react-table';
import { getContent } from '../adapters/get';
import { ToastContext } from '../components/Toast/ToastProvider';
import { error, success } from '../constants';
import { deleteContent } from '../adapters/delete';
import { useNavigate } from 'react-router-dom';
import { deletePatientEndpoint, getAllPatientsEndpoint } from '../adapters/endpoint';

interface Row {
  id: number;
  name: string;
  age: number;
  email: string;
}

interface Props {
  rows: Row[];
}

const PatientList: React.FC = () => {
  const [data, setData] = useState<any[]>()
  const { handleCreateToast } = useContext(ToastContext);
  const navigate=useNavigate();
  function onSuccess(data: any) {
    setData(data);
  }

  function onFail(message: any) {
    handleCreateToast(message, error);
  }
  useEffect(() => {
    getContent(getAllPatientsEndpoint, onSuccess, onFail);
  }, []);


  const columns = useMemo<Array<MRT_ColumnDef<any>>>(
    () => [
      {
        header: 'Card Number',
        accessorKey: "cardNumber",
        size: 50,
      },
      {
        header: 'Name',
        accessorKey: "name",
        size: 50,
      },
      {
        header: 'Age ',
        accessorKey: "age",
        size: 50,
      },
      {
        header: 'Sex ',
        accessorKey: "sex",
        size: 50,
      },
      {
        header: 'Phone Number',
        accessorKey: "phoneNumber",
        size: 50,
      },
      {
        key: 'actions',
        header: 'Actions',
        width: 150,
        accessorFn(originalRow) {
          return (
            <>
            <Button
              // variant="outlined"
              color="info"
              size="small"
              startIcon={<Edit />}
              onClick={() => handleEdit(originalRow)}
            >
              Edit
            </Button>
            <Button
              // variant="outlined"
              color="warning"
              size="small"
              startIcon={<Delete />}
              onClick={() => handleDelete(originalRow)}
            >
              Delete
            </Button>
          </>
          );
        },

        // render: (row: Row) => (
        //   <>
        //     <Button
        //       variant="outlined"
        //       // color="primary"
        //       size="small"
        //       startIcon={<Edit />}
        //       onClick={() => handleEdit(row.id)}
        //     >
        //       Edit
        //     </Button>
        //     <Button
        //       variant="outlined"
        //       // color="secondary"
        //       size="small"
        //       startIcon={<Delete />}
        //       onClick={() => handleDelete(row.id)}
        //     >
        //       Delete
        //     </Button>
        //   </>
        // ),
      }, ],
      [],
    );

  const handleEdit = (row: any) => {
    console.log(row);
    
    navigate(`./${row.cardNumber}`, {
      state: row,
    })
    // console.log(`Edit row with id ${id}`);
  };


  const onDeleteSuccess = (data: any, response: any) =>
  handleCreateToast(response.message, success);
  const onDeleteFail = (message: string) => handleCreateToast(message, error);
  const handleDelete = (row: any) => {
    // const endpoint=`${deletePatientEndpoint/${row.cardNumber}`
    const endpoint=`${deletePatientEndpoint}/${row.cardNumber}`
    deleteContent(endpoint,onDeleteSuccess, onDeleteFail)
  };

  return (
    <div style={{ padding: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h2>Patient List</h2>
        <Button variant="contained" color="primary" onClick={() => navigate('../add-patient')}>
          Add Patient
        </Button>
      </div>
      <div style={{ height: 400, width: '100%' }}>
        <MaterialReactTable columns={columns} data={data ?? []} />
      </div>
    </div>
  );
};

export default PatientList;
