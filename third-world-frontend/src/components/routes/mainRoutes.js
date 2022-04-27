import { Route } from "react-router-dom";
import MainLayout from "../layout/mainLayout"
import BlogsPage from "../pages/blog";
import BlogDetails from "../pages/blogDetails";
import CharityPage from "../pages/charity";
import HomePage from '../pages/home';

const MainRoutes = () => {
    return(
        <MainLayout>
            <Route exact path="/" component={HomePage} />
            <Route path="/charity" component={CharityPage} />
            <Route exact path="/blogs" component={BlogsPage} />
            <Route path="/blogs/:id" component={BlogDetails} />
        </MainLayout>
    )
}

export default MainRoutes