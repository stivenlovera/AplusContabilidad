import { Edit } from "@mui/icons-material";
import { Box, IconButton, Rating } from "@mui/material";
import { Fragment, useState } from "react";
import Delete from "icons/Delete";
import CreateProveedorModal from "./create-proveedor";
import useProveedor from '../../hooks/useProveedor'
const ProveedorColumns = [
    {
        Header: "Codigo",
        accessor: "codigoProveedor"
    },
    {
        Header: "Nombre",
        accessor: "nombreProveedor"
    },
    {
        Header: "Dirrecion",
        accessor: "dirrecion"
    },
    {
        Header: "Telefono",
        accessor: "telefono"
    },
    {
        Header: "Credito",
        accessor: "credito"
    },
    {
        Header: "Acciones",
        accessor: "acciones",
        Cell: ({
            row
        }) => {
            const style = {
                fontSize: 19,
                transition: "color 0.3s",
                color: row.isSelected ? "white" : "text.disabled"
            };

            const { codigo, modal } = useProveedor();

            const [openModal, setOpenModal] = useState(false);
            return <Fragment>
                <IconButton onClick={() => setOpenModal(true)}>
                    <Edit sx={{
                        fontSize: 18,
                        color: "text.disabled"
                    }} />
                </IconButton>
                <CreateProveedorModal editProduct open={openModal} data={row.original} onClose={() => { console.log(codigo, modal); return setOpenModal(false) }} />
                <IconButton onClick={() => { alert('funcion pendiente') }}>
                    <Delete sx={style} />
                </IconButton>
            </Fragment>;
        }
    }];
export default ProveedorColumns;