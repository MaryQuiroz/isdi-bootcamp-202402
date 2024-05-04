import { Card, Dropdown } from "flowbite-react"
import deleteCat from "../logic/deleteCat"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../context/AppContext"
import { ModalComponent } from "./ModalComponent"
import UpdateCatForm from "./UpdateCatForm"
import Confirm from "./Confirm"


export function InfoCatComponent({ cat }) {

  const { cats, setCats, setCat } = useContext(AppContext)
  const [showEditModal, setEditShowModal] = useState(false)
  const [showDeleteModal, setDeleteShowModal] = useState(false)



  const onDeleteHandler = async () => {

    try {
      const catId = await deleteCat(cat._id)
      const filteredCats = cats.filter(cat => cat._id !== catId)
      setCats(filteredCats)
      setDeleteShowModal(false)
    } catch (error) {
      console.log(error)
    }


  }

  const onEditHandler = () => {
    setCat(cat)
    setEditShowModal(true);

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
            alt="Cat image"
            height="96"
            src={cat.avatar}
            width="96"
            className="mb-3 rounded-full shadow-lg"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{cat.name}</h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">{cat.age}</span>
          <div className="mt-4 flex space-x-3 lg:mt-6">
            <a
              href="#"
              className="inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
            >
              Add Task
            </a>
            <a
              href="#"
              className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            >
              Perfil
            </a>
          </div>
        </div>
      </Card>
    </>

  );
}