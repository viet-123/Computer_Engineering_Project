import './App.css';
import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DefaultLayout from './component/DefaultLayout';
import { publicRoutes, privateRoutes, adminPublicRoutes } from './routes';
import { useSelector } from 'react-redux';
function App() {
    const currentUser = useSelector((state) => state.userLogin);
    const role = currentUser.user?.data.user.role;

    const Render = (Routes) => {
        return Routes.map((route, index) => {
            const Page = route.component;
            let Layout = DefaultLayout;

            if (route.layout) {
                Layout = route.layout;
            } else if (route.layout === null) {
                Layout = Fragment;
            }

            return (
                <Route
                    key={index}
                    path={route.path}
                    element={
                        <Layout>
                            <Page />
                        </Layout>
                    }
                />
            );
        });
    };

    return (
        <>
            <div className="App">
                <Router>
                    <Routes>
                        {currentUser.user
                            ? role === 'admin'
                                ? Render(adminPublicRoutes)
                                : Render(publicRoutes)
                            : Render(privateRoutes)}
                    </Routes>
                </Router>
            </div>
        </>
    );
}

export default App;
