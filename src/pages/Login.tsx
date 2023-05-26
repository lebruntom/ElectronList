import React, { useContext } from "react";
import { Navigate, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext.js";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { Field, Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const Login: React.FC = () => {
  const { currentUser } = useContext(AuthContext);

  const auth = getAuth();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(`Veuillez entrer une email valide`)
      .required(`L'email est requis`),
    password: Yup.string()
      .min(8, `Min 8 caractères`)
      // .matches(/[0-9]/, `${t("validation.require-number", { ns: "common" })}`)
      // .matches(/[a-z]/, `${t("require-lowercaseLetter", { ns: "common" })}`)
      // .matches(
      //   /[A-Z]/,
      //   `${t("validation.require-uppercaseLetter", { ns: "common" })}`
      // )
      // .matches(/[^\w]/, `${t("require-symbol", { ns: "common" })}`)
      .required(`Le mot de passe est requis`),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const email = values.email;
      const password = values.password;
      try {
        await signInWithEmailAndPassword(auth, email, password).then(
          (userCredential) => {
            // const user = userCredential.user;
          }
        );
      } catch (error) {
        alert(error);
      }
    },
  });

  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex flex-col">
      <div className="text-center text-xl font-bold text-white my-4">
        Connexion
      </div>
      <FormikProvider value={formik}>
        <Form>
          <Field
            type="email"
            id="email"
            as={Input}
            name="email"
            icon="IoMdMail"
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder="Email"
            error={{
              name: formik.errors.email,
              touched: formik.touched.email,
            }}
          />
          <Field
            type="password"
            id="password"
            as={Input}
            name="password"
            icon="IoMdLock"
            onChange={formik.handleChange}
            value={formik.values.password}
            placeholder="Mot de passe"
            error={{
              name: formik.errors.password,
              touched: formik.touched.password,
            }}
          />

          <Button type="submit">Se connecter</Button>
          <div className="text-center text-white text-sm mt-2">
            Vous n'avez pas de compte ?
            <span className="text-blue">
              <Link to={"/signUp"}> S'inscrire</Link>
            </span>
          </div>
        </Form>
      </FormikProvider>
    </div>
  );
};

export default Login;
