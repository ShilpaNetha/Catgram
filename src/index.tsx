import React, { ReactNode } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";

import { Routes, Route } from "react-router";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import reportWebVitals from "./reportWebVitals";
import HomePage from "./components/homePage";
import "./styles/tailwind.css";
import NavBar from "./components/navBar";
import Upload from "./components/upload/index";
import ErrorBoundary from "./components/errorBoundary";
import "react-toastify/dist/ReactToastify.css";

import store from "./redux/store";
import AppFooter from "./components/footer";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const queryClient = new QueryClient();
interface ILayoutProps {
  children: ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
      <AppFooter />
    </>
  );
};

root.render(
  <Provider store={store}>
    <ErrorBoundary>
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <ToastContainer />

            <Routes>
              <Route
                path="/"
                element={
                  <Layout>
                    <HomePage />
                  </Layout>
                }
              />
              <Route
                path="/upload"
                element={
                  <Layout>
                    <Upload />
                  </Layout>
                }
              />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </React.StrictMode>
    </ErrorBoundary>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
