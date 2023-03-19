import Home from '../page/Home/Home';
import Profile from '../page/Profile/Profile';
import History from '../page/History/History';
import People from '../page/People/People';
import Statistical from '../page/Statistical/Statistical';
import Login from '../page/Login/Login';
import Signup from '../page/SignUp/Signup';
import Password from '../page/Password/Password';
import InfoRegister from '../page/InfoRegister/InfoRegister';
import UserList from '../page/UserList/UserList';
import Buildings from '../page/Buildings/Buildings';
import Cameras from '../page/Cameras/Cameras';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/profile', component: Profile },
    { path: '/allhistory', component: History },
    { path: '/statis', component: Statistical },
    { path: '/password', component: Password },
    { path: '/people', component: People },
    { path: '/userlist', component: UserList },
    { path: '/building', component: Buildings },
    { path: '/camera', component: Cameras },
];

const privateRoutes = [
    { path: '/', component: Login, layout: null },
    { path: '/signup', component: Signup, layout: null },
    { path: '/inforegister', component: InfoRegister, layout: null },
];

export { publicRoutes, privateRoutes };
