import Layout from "../components/layout/layout";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import { AuthProvider } from "../context/AuthContext";
import SignUp from "./SignUp";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import List from "./List";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Lists from "./Lists";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route
              path="/lists"
              element={
                <PrivateRoute>
                  <Lists />
                </PrivateRoute>
              }
            />
            <Route
              path="/list/:listName"
              element={
                <PrivateRoute>
                  <List />
                </PrivateRoute>
              }
            />
          </Routes>
        </Layout>
      </AuthProvider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
