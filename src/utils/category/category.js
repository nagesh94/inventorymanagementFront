import { MdDashboard,MdSell,MdLogout,MdPeopleAlt,MdShoppingCart,MdProductionQuantityLimits,MdSettings } from 'react-icons/md';
import { GrOrganization} from 'react-icons/gr';
import { BsLayoutThreeColumns} from 'react-icons/bs';
import { BiPurchaseTag} from 'react-icons/bi';


const category=[{icons:<MdDashboard/>,heading:"DASHBOARD",link:"/home"},
{icons:<BiPurchaseTag />,heading:"PURCHASE",link:"/purchase"},
{icons:<MdSell />,heading:"SELL",link:"/sell"},
{icons:<MdPeopleAlt />,heading:"CUSTOMER",link:"/customer"},
{icons:<GrOrganization />,heading:"SUPPLIERS",link:"/supplier"},
{icons:<MdShoppingCart />,heading:"ORDERS",link:"/order"},
{icons:<BsLayoutThreeColumns />,heading:"ATTRIBUTES",link:"/attribute"},
{icons:<MdProductionQuantityLimits />,heading:"PRODUCT",link:"/product"},
{icons:<MdSettings />,heading:"SETTING",link:"/setting"},


]

export default category;