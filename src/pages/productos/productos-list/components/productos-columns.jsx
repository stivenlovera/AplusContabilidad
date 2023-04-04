import { Edit } from "@mui/icons-material";
import { Box, IconButton, Rating } from "@mui/material";
import { Fragment, useState } from "react";
import CreateProductoModal from "./create-producto";
const ProductosColumns = [
    {
        Header: "Codigo",
        accessor: "codigo"
    },
    {
        Header: "Categoria",
        accessor: "categoria"
    },
    {
        Header: "Nombre",
        accessor: "nombre"
    },
    {
        Header: "Fecha Vencimiento",
        accessor: "fechaVencimiento"
    },
    {
        Header: "Lote",
        accessor: "lote"
    },
    {
        Header: "Unidad Medida",
        accessor: "unidadMedida"
    },
    {
        Header: "Cantidad",
        accessor: "cantidad"
    },
    {
        Header: "Precio compra",
        accessor: "precioCompra"
    },
    {
        Header: "Precio venta",
        accessor: "precioVenta"
    },
    {
        Header: "Proveedor",
        accessor: "proveedor"
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
                <CreateProductoModal editProduct open={openModal}  data={row.original} onClose={() => setOpenModal(false)} />
            </Fragment>;
        }
    }];
export default ProductosColumns;