// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'teams',
    path: '/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Setting',
    path: '/edit',
    icon: icon('ic_cart'),
  },
  {
    title: 'Sign Out',
    path: '/login',
    icon: icon('ic_lock'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
