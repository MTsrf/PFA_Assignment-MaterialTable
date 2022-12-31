const columns = [
    { title: "Name", field: "name" },
    { title: "Email", field: "email" },
    {
        title: "DOB", field: "dob", cellStyle: {
            width: 300,
            maxWidth: 300
        },
        headerStyle: {
            width: 200,
            maxWidth: 200
        }
    },
    {
        title: "Address", field: "address", width: '40%',
        cellStyle: {
            width: 200,
            maxWidth: 200,
        },
        headerStyle: {
            width: 200,
            maxWidth: 200
        }
    },
    { title: "Country", field: "country" }
]

export { columns }