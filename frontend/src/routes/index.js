import Home from '../page/Home/Home';
import Profile from '../page/Profile/Profile';
import History from '../page/History/History';
import Statistical from '../page/Statistical/Statistical';
import Login from '../page/Login/Login';
import Signup from '../page/SignUp/Signup';
import Password from '../page/Password/Password';
const publicRoutes = [
      { path: '/', component: Home },
      { path: '/profile', component: Profile },
      { path: '/acchistory', component: History },
      { path: '/allhistory', component: History },
      { path: '/statis', component: Statistical },
      { path: '/password', component: Password },
];

const privateRoutes = [
      { path: '/', component: Login, layout: null },
      { path: '/signup', component: Signup, layout: null },
];

export { publicRoutes, privateRoutes };
