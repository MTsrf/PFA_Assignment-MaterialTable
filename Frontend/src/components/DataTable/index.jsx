import React, { useEffect, useState } from 'react'
import MaterialTable from '@material-table/core';
import { ExportCsv } from "@material-table/exporters";
import { MdOutlineFilterList } from 'react-icons/md'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import DialogBox from '../Dailog';
import UploadCsv from '../UploadCsv';
import { exportJson } from '../../helper/JsonFile';
import { createTableSource } from '../../helper/CreateTableSource';
import { IoSave } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

import { deleteData, sendFiles, updateData } from '../../helper/axiosInstance'
import axios from 'axios';

const index = ({
    columns,
    tableData,
    setUpdate,
    upload,
    save }) => {
    const [filter, setFilter] = useState(false)
    const [datas, setDatas] = React.useState([])
    const [columnData, setColumnData] = React.useState([])
    const [columnsFile, setColumnsFile] = React.useState()
    const [error, setError] = React.useState("")
    const navigate = useNavigate()
    useEffect(() => {
        const columnCreation = () => {
            setColumnsFile(createTableSource(columnData))
        }
        columnCreation()
    }, [columnData])
    const uploadData = async () => {
        if (!datas.length) {
            return setError("No Data")
        }
        try {
            const { data: { success, message } } = await sendFiles('/send-files-data', datas)
            if (success) {
                navigate('/')
            }
        } catch (err) {
            console.log(err.response.data)
        }
    }
    return (
        <>
            <MaterialTable
                columns={columnsFile ? columnsFile : columns}
                data={datas.length ? datas : tableData}
                editable={{
                    onRowUpdate: async (newRow, oldData) => {
                        try {
                            const { data:
                                { success,
                                    message,
                                    data }
                            } = await updateData(`/edit-data/${oldData._id}`, newRow)
                            if (success) {
                                setUpdate(prev => !prev)
                            }
                        } catch (err) {
                            console.log(err.response.data)
                        }
                    },
                    onRowDelete: async (Row) => {
                        try {
                            const {
                                data: {
                                    success,
                                    message
                                }
                            } = await deleteData(`/delete-data/${Row._id}`)
                            if (success) {
                                setUpdate(prev => !prev)
                            }
                        } catch (err) {
                            console.log(err.response.data)
                        }
                    }
                }}

                options={{
                    sorting: true,
                    search: true,
                    searchFieldAlignment: "right",
                    searchAutoFocus: true,
                    searchFieldVariant: 'standard',
                    filtering: filter,
                    paging: true,
                    pageSizeOptions: [5, 10, 15],
                    paginationType: 'stepped',
                    showFirstLastPageButtons: false,
                    exportMenu: [
                        {
                            label: "Export CSV Row Files",
                            exportFunc: (cols, datas) =>
                                ExportCsv(cols, datas, "ShowReportedData"),
                        },
                        {
                            label: "Export CSV All Files",
                            exportFunc: (cols, datas) =>
                                ExportCsv(cols, tableData, "AllReportedData"),
                        },
                        {
                            label: "Export Json file",
                            exportFunc: (cols, datas) =>
                                exportJson(datas.length ? datas : tableData)

                        }
                    ],
                    addRowPosition: "first",
                    actionsColumnIndex: -1,
                    selection: true,
                    rowStyle: (data, index) => index % 2 == 0 ?
                        {
                            backgroundColor: "#d4d4d4"
                        } : null,
                    headerStyle: {
                        fontSize: '20px',
                        fontWeight: "bold"
                    }
                }}
                actions={[
                    {
                        icon: () => upload ?
                            <UploadCsv
                                setDatas={setDatas}
                                datas={datas}
                                setColumnData={setColumnData}
                                columnData={columnData}
                            /> :
                            <DialogBox
                                setUpdate={setUpdate} />,
                        tooltip: upload ? "Upload Csv" : "Add row",
                        isFreeAction: true
                    },
                    {
                        icon: () => save && <IoSave
                            onClick={uploadData}
                        />,
                        tooltip: save && "Save file DB",
                        isFreeAction: save && true,
                    },
                    {
                        icon: () => filter ?
                            <IoIosCloseCircleOutline
                                onClick={() => setFilter(false)}
                            /> : <MdOutlineFilterList
                                onClick={() => setFilter(true)} />,
                        isFreeAction: true,
                        tooltip: "show/hide filter option"
                    },

                ]}
                title="DataTable"
            />
        </>
    )
}

export default index
