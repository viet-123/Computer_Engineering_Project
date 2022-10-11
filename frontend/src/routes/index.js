import Home from '../page/Home/Home';
import Profile from '../page/Profile/Profile';
import History from '../page/History/History';
import Statistical from '../page/Statistical/Statistical';
import Login from '../page/Login/Login';
import Signup from '../page/SignUp/Signup';
const publicRoutes = [
      { path: '/', component: Home },
      { path: '/login', component: Login, layout: null },
      { path: '/signup', component: Signup, layout: null },
      { path: '/profile', component: Profile },
      { path: '/history', component: History },
      { path: '/statis', component: Statistical },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
