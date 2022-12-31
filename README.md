
# PFA assignment 

CRUD Operations using form and table convert table to CSV.

# Page 1:
The form has fields for name, email, dob, address, and country with all and 
required fields and email validation.

* Taking all these inputs and saving them to the MongoDB
* All this is done in ReactJs material-ui table , then edit, update and delete options for data
* All crude changes in MongoDBChanged.
* The option to convert this table to a CSV file has been changed, which can be downloaded on the screen
* Also, a search filter is provided below the table header that takes the input and returns the search result. Clicking on the checkbox will show it

# Page 2:
* The right side of the table gives the option to add a CSV file
* After uploading the file is seen in material table
*  after Pressing the save button will store in the DB



## API Reference

#### Get all items

```http
  POST "http://localhost:5000/create"
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required** |
| `email` | `string `| **Required**|
| `dob` | `date `| **Required**|
| `country` | `string `| **Required**|
| `address` | `string `| **Required**|

GET Data
```http
  GET   "http://localhost:5000/user-data""
```

Update Data
```http
  PUT   "http://localhost:5000/edit-data/:id"
```
Delete Data
```http
  DELETE   "http://localhost:5000/delete-data/:id"
```
Upload file
```http
  POST  "http://localhost:5000/send-files-data"
```


## Deployment

FrontEnd

```bash
  npm run dev
```
Back-End

devlopment
```bash
  npm run dev
```
production
```bash
  npm start
```



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`:5000

`MONGOURL`: mongodb+srv://{user}:{password}@cluster0.m6j01rv.mongodb.net/{DBname}?retryWrites=true&w=majority

