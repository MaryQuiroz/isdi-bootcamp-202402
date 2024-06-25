import { Card, Dropdown } from "flowbite-react"
import deleteCat from "../logic/deleteCat"
import { useContext, useState } from "react"
import { AppContext } from "../context/AppContext"
import { ModalComponent } from "./Modal"
import UpdateCatForm from "./UpdateCatForm"
import Confirm from "./Confirm"
import { AddTaskForm } from "./AddTaskForm"
import {CatProfile} from "./CatProfile"
import { calculateAge } from "../utils"
import { useNavigate } from "react-router-dom"


export function InfoCatComponent({ cat }) { 
  const { cats, setCats, setCat } = useContext(AppContext)
  const [showEditModal, setEditShowModal] = useState(false)
  const [showDeleteModal, setDeleteShowModal] = useState(false)
  const [showAddTaskModal, setAddTaskModal] = useState(false)
  const [showProfileModal, setProfileModal] = useState(false)
  const navigate = useNavigate()

  const onDeleteHandler = async () => {

    
      const catId = await deleteCat(cat.id)
      const filteredCats = cats.filter(cat => cat.id !== catId)
      setCats(filteredCats)
      setDeleteShowModal(false)
  }

  const onEditHandler = () => {
    setCat(cat)
    setEditShowModal(true);

  }

  const onAddTaskHandler = () => {
    setCat(cat)
    setAddTaskModal(true)

  }

  const onClickProfileHandler = () => {
    setCat(cat)
    setProfileModal(true)

  }

  const viewTaskHandler=()=>{
    setCat(cat)
    navigate(`/tasks/${cat.id}`)

  }

  return (

    <>
      <ModalComponent
        title="Edit Cat"
        show={showEditModal}
        onClose={() => setEditShowModal(false)}
        form={
          <UpdateCatForm setShowModal={setEditShowModal} />
        }
      />

      <ModalComponent
        title="Are you sure?"
        show={showDeleteModal}
        onClose={() => setDeleteShowModal(false)}
        form={
          <Confirm setShowModal={setDeleteShowModal} onDelete={onDeleteHandler} />
        }
      />

      <ModalComponent
        title="Add Task"
        show={showAddTaskModal}
        onClose={() => setAddTaskModal(false)}
        form={
          <AddTaskForm setShowModal={setAddTaskModal} />
        }
      />

      <ModalComponent
        title="Profile"
        show={showProfileModal}
        onClose={() => setProfileModal(false)}
        form={
          <CatProfile />
        }
      />


      <Card className="max-w-full mt-4 flex space-x-3 lg:mt-6 md:max-w-sm mx-auto">
        <div className="flex justify-end px-4 pt-4">
          <Dropdown inline label="" >

            <Dropdown.Item>
              <a
                onClick={onEditHandler}
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Edit
              </a>
            </Dropdown.Item>

            <Dropdown.Item>
              <a
                onClick={() => setDeleteShowModal(true)}
                href="#"
                className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Delete
              </a>
            </Dropdown.Item>
          </Dropdown>
        </div>
        <div className="flex flex-col items-center pb-10">
          <img
            alt={cat.name}
            src={cat.avatar}
            className="w-48 h-48 mb-3 rounded-full shadow-lg"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{cat.name}</h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">{calculateAge(cat.birthdate)}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">{cat.color}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">{cat.breed}</span>
          <h5 className="mb-1  text-gray-900 dark:text-white">{cat.description}</h5>

          <div className="mt-4 flex space-x-3 lg:mt-6">
            <a
              href="#"
              className="inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
              onClick={viewTaskHandler}
            >

              View Tasks
            </a>
            
          </div>
        </div>
      </Card>
    </>

  );
}