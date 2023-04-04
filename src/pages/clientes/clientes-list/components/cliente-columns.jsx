import { Edit } from "@mui/icons-material";
import { Box, IconButton, Rating } from "@mui/material";
import { Fragment, useState } from "react";
import CreateClienteModal from "./create-cliente";
const ClienteColumns = [
    {
        Header: "Codigo",
        accessor: "codigo"
    },
    {
        Header: "Nombre",
        accessor: "nombreCliente"
    },
    {
        Header: "Telefono",
        accessor: "telefono"
    },
    {
        Header: "Dirrecion",
        accessor: "dirrecion"
    },
    {
        Header: "Email",
        accessor: "email"
    },
    {
        Header: "CI - NIT",
        accessor: "ci"
    },
    {
        Header: "Monto credito",
        accessor: "montoCredito"
    },
    {
        Header: "Acciones",
        accessor: "acciones",
        Cell: ({
            row
        }) => {
            const [openModal, setOpenModal] = useState(false);
            return <Fragment>
                <IconButton onClick={() => setOpenModal(true)}>
                    <Edit sx={{
                        fontSize: 18,
                        color: "text.disabled"
                    }} />
                </IconButton>
                <CreateClienteModal editProduct open={openModal}  data={row.original} onClose={() => setOpenModal(false)} />
            </Fragment>;
        }
    }];
export default ClienteColumns;