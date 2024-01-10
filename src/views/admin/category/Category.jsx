import "./category.css"
import {FaImages, FaList, FaTable} from "react-icons/fa";

import {useEffect, useState} from "react";
import {FaX} from "react-icons/fa6";
import {Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import Button from "@mui/material/Button";


/*TODO:
   - modal action confirmation on CRUD
   - make modals look "better"
*/
const Category = ({addCategory, categoriesList, deleteCategoryByID, newToastNotif}) => {
    const regex = /^[a-zA-Z0-9àáãâÀÁÃÂèéêÈÉÊìíîÌÍÎòóõôÒÓÕÔùúûÙÚÛ]*$/

    const [processing, setProcessing] = useState(false)

    const [addCategoryName, setAddCategoryName] = useState("")
    const [editNewCategoryName, setEditNewCategoryName] = useState("")

    const [addModalshown, setAddModalShown] = useState(false)

    const [editModalshown, setEditModalShown] = useState(false)
    const [editCategoryData, setEditCategoryData] = useState([])

    async function handleCategoryAdd() {
        setProcessing(true)
        const res = await addCategory({name: addCategoryName})
        console.log(res)
        setProcessing(false)

        if(res.code === (403 || 401)){ //forbidden
            newToastNotif("error", res.message)
            return
        }
        newToastNotif("success", "Created with success.")
        setAddModalShown(false)

    }

    async function handleCategoryDelete(category_id) {
        //console.log(category_id)
        setProcessing(true)
        const res = await deleteCategoryByID(category_id)
        console.log(res)
        setProcessing(false)

        if(res.code === 403){ //forbidden
            newToastNotif("error", res.message)
            return
        }
        newToastNotif("success", "Deleted with success.")
        setAddModalShown(false)
    }

    return (
        <>
            {/*ADD CATEGORY MODAL/DIALOG*/}
            <Dialog
                maxWidth="xs"
                TransitionProps={{ onEntered: () => {}, onExited: () => {setAddCategoryName("")} }}
                open={addModalshown}
            >
                <DialogTitle>New Category</DialogTitle>
                <DialogContent > {/*dividers*/}
                    <div className="row g-3">
                        <div className="col-12">
                            <input value={addCategoryName} onChange={(e) => {
                                if (regex.test(e.target.value)) {
                                    setAddCategoryName(e.target.value)
                                }
                            }} type="text" className="form-control" placeholder="New category"/>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setAddModalShown(false)}>Cancel</Button>
                    <Button onClick={() => handleCategoryAdd()} disabled={processing} >{processing ? <CircularProgress color="inherit" /> : "Add" }</Button>
                </DialogActions>
            </Dialog>

            {/*EDIT CATEGORY MODAL/DIALOG*/}
            <Dialog
                maxWidth="xs"
                TransitionProps={{ onEntered: () => {}, onExited: () => {setEditNewCategoryName("")} }}
                open={editModalshown}
            >
                <DialogTitle>Edit Category</DialogTitle>
                <DialogContent > {/*dividers*/}
                    <div className="row g-3">
                        <div className="col-12">
                            <Chip
                                //color={"primary"}
                                label={editCategoryData.name}
                            />
                        </div>

                        <div className="col-12">
                            <input value={editNewCategoryName} onChange={(e) => {
                                if (regex.test(e.target.value)) {
                                    setEditNewCategoryName(e.target.value)
                                }
                            }} type="text" className="form-control" placeholder="New name"/>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditModalShown(false)}>No</Button>
                    {/*<Button onClick={() => } disabled={processing} >{processing ? <CircularProgress color="inherit" /> : "Yes" }</Button>*/}
                </DialogActions>
            </Dialog>

            <div className="col-lg-4">
                <div className="card shadow mb-4">
                    <div className="card-header py-3 d-flex justify-content-between align-items-center">
                        <h6 className="m-0 font-weight-bold text-primary"><span><FaList className={"me-1"}></FaList></span> New category</h6>
                        <a onClick={() => setAddModalShown(true)} className="btn btn-success btn-sm text-white">Add</a>
                        {/*<a onClick={() => handleCategoryAdd()} className="btn btn-success btn-sm text-white">Add</a>*/}
                        {/*<input onChange={(e) => setCatName(e.target.value)} value={catName}/>*/}
                    </div>
                    <div className="card-body">
                        <div className="row g-1">
                            {categoriesList?.map((category, index) => {
                                return (
                                    <div key={index} className="col-auto">
                                        {/*<a className={"btn btn-primary btn-icon-split text-white"}>
                                            <span onClick={() => handleCategoryDelete(category.$id)} className={"icon"}><FaX></FaX></span>
                                            <span className={"text"}>{category.name}</span>
                                        </a>*/}

                                        <Chip
                                            //color={"primary"}
                                            label={category.name}
                                            onClick={() => {
                                                setEditCategoryData(category)
                                                setEditModalShown(true)
                                            }}
                                            onDelete={() => handleCategoryDelete(category.$id)}
                                        />
                                    </div>
                                )
                            })}


                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Category