import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import DataTable from '../components/DataTable'
import { columns } from '../../TableSource'
import { getData } from '../helper/axiosInstance'
const HomePage = () => {
    const [tableData, setTableData] = useState([])
    const [update, setUpdate] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            const { data:
                { success,
                    message,
                    data }
            } = await getData("/user-data")
            setTableData(data)
        }
        fetchData()
    }, [update])
    return (
        <>
            <main className='main-component'>
                <Header />
                <section className="tableData">
                    <div className="tablecontainer">
                        <div className="inside-table">
                            <DataTable
                                columns={columns}
                                tableData={tableData}
                                setUpdate={setUpdate}
                            />
                        </div>
                    </div>
                </section>

            </main>
        </>
    )
}

export default HomePage
