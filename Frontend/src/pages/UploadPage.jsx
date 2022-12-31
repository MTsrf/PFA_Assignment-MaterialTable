import React from 'react'
import Header from '../components/Header'
import DataTable from '../components/DataTable'
import { columns } from '../../TableSource'
const UploadPage = () => {
    return (
        <>
            <main className='main-component'>
                <Header />
                <section className="tableData">
                    <div className="tablecontainer">
                        <div className="inside-table">
                            <DataTable
                                columns={columns}
                                upload={true}
                                save={true}

                            />
                        </div>
                    </div>
                </section>

            </main>
        </>
    )
}

export default UploadPage
