import * as React from 'react';
import { AiOutlineUpload } from 'react-icons/ai'
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Box,
    Typography

} from '@material-ui/core';
import { Input, Textarea, Button } from '../StyledComponent/StyledComponent';
import csv from 'csvtojson'


export default function UploadCsv({ setDatas, datas, columnData, setColumnData }) {
    const [open, setOpen] = React.useState(false);
    const [file, setFile] = React.useState();

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const fileReader = new FileReader();

    const handleOnChange = (e) => {
        setFile(e.target.files[0]);
    };


    const getKeys = (datas) => {
        datas.map((item, index) => {
            if (index === 0) {
                const keyss = Object.keys(item);
                setColumnData(keyss)
            }
        })

    }
    const csvFileToArray = string => {
        csv({
            noheader: true,
            output: "json"
        })
            .fromString(string)
            .then((csvRows) => {
                const toJson = []
                csvRows.forEach((aCsvRow, i) => {


                    if (i !== 0) {
                        const builtObject = {}

                        Object.keys(aCsvRow).forEach((aKey) => {
                            const valueToAddInBuiltObject = aCsvRow[aKey];
                            const keyToAddInBuiltObject = csvRows[0][aKey];
                            builtObject[keyToAddInBuiltObject] = valueToAddInBuiltObject;
                        })

                        toJson.push(builtObject)
                    }


                })
                getKeys(toJson)
                setDatas(toJson)
                setOpen(false)
            })
    };
    const handleOnSubmit = (e) => {
        e.preventDefault();

        if (file) {
            fileReader.onload = function (event) {
                const csvOutput = event.target.result;
                csvFileToArray(csvOutput)
            };

            fileReader.readAsText(file);
        }
    };
    return (
        <div>
            <AiOutlineUpload onClick={handleClickOpen} />

            <Dialog open={open} onClose={handleClose}>
                <form >
                    <DialogTitle>
                        <Typography>Register User</Typography>
                    </DialogTitle>
                    <DialogContent>
                        <Grid className='main-content' item xs={8}>

                            <Grid item xs={8}>
                                <Box>
                                    <label htmlFor='name'>
                                        Upload CSV:</label>
                                    <Input
                                        type={"file"}
                                        id={"csvFileInput"}
                                        accept={".csv"}
                                        onChange={handleOnChange}
                                    />
                                </Box>
                            </Grid>

                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button
                            onClick={(e) => {
                                handleOnSubmit(e);
                            }}
                        >Submit</Button>
                    </DialogActions>
                </form>
            </Dialog>

        </div >
    );
}



