import './App.css';
import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DefaultLayout from './component/DefaultLayout';
import { publicRoutes } from './routes';
import AccountItem from './component/AccoutnItem/AccountItem';
function App() {
      return (
            <>
                  <div className="App">
                        <Router>
                              <Routes>
                                    {publicRoutes.map((route, index) => {
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
                                    })}
                                    <Route path="/map" element={<AccountItem />}></Route>
                              </Routes>
                        </Router>
                  </div>
            </>
      );
}

export default App;
