import React, { useContext, useState, useEffect } from "react";
import { db } from "../utils/firebase.config";
import { collection, setDoc, getDocs, doc } from "firebase/firestore";
import Button from "../components/ui/Button";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import { dataInterface } from "../lib/types";
import Modal from "react-modal";
import { Field, Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import Input from "../components/ui/Input";

const Lists: React.FC = () => {
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();

  const lists = useQuery(["lists"], async () => {
    const querySnapshot = await getDocs(
      collection(db, "users", currentUser.email, "lists")
    );

    const data: dataInterface[] = [];
    querySnapshot.forEach((doc) => {
      data.push({
        name: doc.id,
        data: doc.data(),
      });
    });

    console.log("Execution du call pour recuperer les lists");

    return data;
  });

  function closeModal() {
    setModalIsOpen(false);
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(`Le nom est requis`),
  });
  const initialValues = {
    name: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const name = values.name;
      try {
        const collectionRef = collection(
          db,
          "users",
          currentUser.email,
          "lists"
        );
        const listRef = doc(collectionRef, name);
        const data = {};

        await setDoc(listRef, data).then(() => {
          const old: dataInterface[] =
            queryClient.getQueryData(["lists"]) || [];

          queryClient.setQueryData(["lists"], [...old, { name, data: {} }]);
          closeModal();
          navigate(`/list/${name}`);
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
  });
  return (
    <div>
      {lists.data &&
        lists.data.sort().map((list) => {
          return (
            <div key={list.name} className="text-white">
              <Link to={`/list/${list.name}`}>{list.name}</Link>
            </div>
          );
        })}
      <div onClick={() => setModalIsOpen(true)}>add</div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="fixed top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] bg-background rounded-xl p-4"
        overlayClassName="fixed h-screen w-screen top-0 left-0 bg-backgroundOpacity"
        contentLabel="Example Modal"
      >
        <FormikProvider value={formik}>
          <div className="text-white text-center mb-4">Create list</div>

          <Form>
            <Field
              type="text"
              id="name"
              as={Input}
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              placeholder="Name"
              error={{
                name: formik.errors.name,
                touched: formik.touched.name,
              }}
            />
            <Button type="submit">Send</Button>
          </Form>
        </FormikProvider>
      </Modal>
    </div>
  );
};

export default Lists;
