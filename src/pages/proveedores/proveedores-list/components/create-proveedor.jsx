import { Add } from "@mui/icons-material";
import { Button, Grid, IconButton, RadioGroup, styled, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import AppModal from "components/AppModal";
import AppRadio from "components/AppRadio";
import FlexBox from "components/flexbox/FlexBox";
import FlexRowAlign from "components/flexbox/FlexRowAlign";
import AppTextField from "components/input-fields/AppTextField";
import Scrollbar from "components/ScrollBar";
import { H2, H6, Small } from "components/Typography";
import { useFormik } from "formik";
import DeleteIcon from "icons/DeleteIcon";
import { StyledFormControlLabel } from "page-sections/accounts/account-v2/StyledComponent";
import { useEffect, useState } from "react";
import { GuardarProveedorService, ModificarProveedorService } from "Services/api-ventas-erp/proveedores";
import * as Yup from "yup"; // component props interface

// styled components
const StyledAppModal = styled(AppModal)(({
    theme
}) => ({
    maxWidth: 700,
    minWidth: 300,
    outline: "none",
    padding: "1.5rem"
}));
const ImageDeleteWrapper = styled(FlexRowAlign)(({
    theme
}) => ({
    top: 5,
    right: 5,
    width: 25,
    height: 25,
    borderRadius: "50%",
    position: "absolute",
    backgroundColor: theme.palette.error.main
}));
const ImageUploadWrapper = styled(FlexRowAlign)(({
    theme
}) => ({
    minHeight: 140,
    cursor: "pointer",
    borderRadius: "8px",
    backgroundColor: theme.palette.grey[200]
}));

const CreateProveedorModal = ({
    open,
    data,
    onClose,
    editProduct,
    codigo
}) => {

    const downXl = useMediaQuery(theme => theme.breakpoints.down("xl"));
    const [selectedValue, setSelectedValue] = useState("1");
    const handleChangeSelect = event => {
        setSelectedValue(event.target.value);
        setFieldValue('credito', event.target.value);
    };

    function verificar() {
        {
            return editProduct && data ? ({
                id: data.id,
                codigoProveedor: data.codigoProveedor,
                nombreProveedor: data.nombreProveedor,
                dirrecion: data.dirrecion,
                telefono: data.telefono,
                credito: data.credito == 'si' ? '0' : '1'
            }) : ({
                id: "",
                codigoProveedor: codigo,
                nombreProveedor: "",
                dirrecion: "",
                telefono: "",
                credito: "1"
            })
        }
    }

    const validationSchema = Yup.object().shape({
        codigoProveedor: Yup.string().min(3, "es muy cortos").required("Codigo proveedor es requerido!"),
        nombreProveedor: Yup.string().min(3, "es muy cortos").required("Nombre es requerido!"),
        dirrecion: Yup.string().required("Dirrecion es requerido!"),
        id: Yup.number().nullable(),
        telefono: Yup.string().required("Telefono es requerido!"),
        credito: Yup.string().required("Credito es requerido!")
    });
    const {
        values,
        errors,
        handleChange,
        handleSubmit,
        touched,
        isValid,
        setFieldValue,
        resetForm
    } = useFormik({
        initialValues: verificar(),
        validationSchema,
        onSubmit: async (values) => {
            if (editProduct && data) {
                const { data } = await ModificarProveedorService(values)
                resetForm();
                onClose();
                console.log(data.message);
            }
            else {
                const { data } = await GuardarProveedorService(values)
                resetForm();
                onClose();
                console.log(data.message);
            }
        }
    });

    return <StyledAppModal open={open} handleClose={onClose}>
        <H2 marginBottom={2}>
            {editProduct && data ? "Editar proveedor" : "Añadir proveedor"}
        </H2>

        <form onSubmit={handleSubmit}>
            <Scrollbar style={{
                maxHeight: downXl ? 500 : "auto"
            }}>
                <Grid container spacing={2}>
                    <Grid item sm={6} xs={12}>
                        <H6 mb={1}>Codigo</H6>
                        <AppTextField
                            fullWidth
                            size="small"
                            name="codigoProveedor"
                            placeholder="Codigo"
                            value={values.codigoProveedor}
                            onChange={handleChange}
                            error={Boolean(touched.codigoProveedor && errors.codigoProveedor)}
                            helperText={touched.codigoProveedor && errors.codigoProveedor}
                        />
                    </Grid>

                    <Grid item sm={6} xs={12}>
                        <H6 mb={1}>Nombre</H6>
                        <AppTextField
                            fullWidth
                            size="small"
                            name="nombreProveedor"
                            placeholder="Nombre"
                            value={values.nombreProveedor}
                            onChange={handleChange}
                            error={Boolean(touched.nombreProveedor && errors.nombreProveedor)}
                            helperText={touched.nombreProveedor && errors.nombreProveedor} />
                    </Grid>

                    <Grid item xs={12}>
                        <H6 mb={1}>Dirrecion</H6>
                        <AppTextField
                            fullWidth
                            multiline
                            rows={3}
                            name="dirrecion"
                            placeholder="Dirrecion"
                            value={values.dirrecion}
                            onChange={handleChange}
                            error={Boolean(touched.dirrecion && errors.dirrecion)}
                            helperText={touched.dirrecion && errors.dirrecion} />
                    </Grid>

                    <Grid item sm={6} xs={12}>
                        <H6 mb={1}>Telefono</H6>
                        <AppTextField
                            fullWidth
                            size="small"
                            name="telefono"
                            placeholder="Telefono"
                            value={values.telefono}
                            onChange={handleChange}
                            error={Boolean(touched.telefono && errors.telefono)}
                            helperText={touched.telefono && errors.telefono} />
                    </Grid>

                    <Grid item sm={6} xs={12}>
                        <H6 mb={1}>Tipo Pago</H6>
                        <RadioGroup row value={selectedValue} onChange={handleChangeSelect} >
                            <StyledFormControlLabel value="1" control={<AppRadio />} label="Credito" />
                            <StyledFormControlLabel value="0" control={<AppRadio />} label="Contado" />
                        </RadioGroup>
                    </Grid>
                </Grid>
            </Scrollbar>

            <Grid container>
                <Grid item xs={12}>
                    <FlexBox justifyContent="flex-end" gap={2} marginTop={2}>
                        <Button fullWidth variant="outlined" onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button fullWidth type="submit" variant="contained" onSubmit={handleSubmit} >
                            Guardar
                        </Button>
                    </FlexBox>
                </Grid>
            </Grid>
        </form>
    </StyledAppModal>;
};

const images = ["/static/products/watch.png", "/static/products/camera.png", "/static/products/headphone.png"];
export default CreateProveedorModal;