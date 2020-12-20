import React, {useState, Suspense} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {
  ChakraProvider,
  extendTheme,
} from "@chakra-ui/react";
import JwtContext from './Components/JwtContext';
import { Landing } from "./Landing";
import { NavBar } from "./Components/NavBar";
// Components below are lazy-loaded to speed up the page load
const AdminMain = React.lazy(() => import("./AdminMain"));
const AdminLogin = React.lazy(() => import("./AdminLogin"));
const AdminAddCategory = React.lazy(() => import('./AdminAddCategory'));
const AdminCourses = React.lazy(() => import('./AdminCourses'));
const AdminArticles = React.lazy(() => import('./AdminArticles'));
const AdminAddArticle = React.lazy(() => import("./AdminAddArticle"));
const AdminEditArticle = React.lazy(() => import("./AdminEditArticle"));
const AdminEditCategory = React.lazy(() => import("./AdminEditCategory"));
const Courses = React.lazy(() => import("./Courses"));
const Articles = React.lazy(() => import("./Articles"));

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "#1B1B3A",
        color: "white"
      }
    }
  }
});


export const App = () => {
  const [token, setToken] = useState<null | string>(null);
  const setJwt = (newToken: string) => {
    setToken(newToken);
  }
  return (
    <Router>
      <ChakraProvider theme={theme}>
        <Switch>
          <Route exact path="/" children={<Landing />} />
          <Suspense fallback={<>
            <NavBar></NavBar>
          </>}>
          <Route exact path="/category/:id" children={<Courses />} />
          <Route exact path="/course/:courseId/:articleId" children={<Articles />} />
          <JwtContext.Provider value={{ token, setJwt }}>
          <Route exact path="/admin">
            <AdminMain jwt={token} />
          </Route>
          <Route exact path="/admin/category/add">
            <AdminAddCategory jwt={token} />
            </Route>
            <Route exact path="/admin/category/:id/edit" children={<AdminEditCategory jwt={token} />} />
            <Route exact path="/admin/article/:id" children={<AdminEditArticle jwt={token} />} />
            <Route exact path="/admin/course/:id/article/add" children={<AdminAddArticle jwt={token} />} />
            <Route exact path="/admin/category/:id/courses" children={<AdminCourses jwt={token} />} />
            <Route exact path="/admin/category/:categoryId/courses/:courseId/articles" children={<AdminArticles jwt={token} />} />
          <Route path="/admin/login">
            <AdminLogin/>
            </Route>
            </JwtContext.Provider>
          </Suspense>
        </Switch>
      </ChakraProvider>
    </Router>
)}
