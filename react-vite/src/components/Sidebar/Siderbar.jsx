import { FaBookmark, FaHome, FaQuestionCircle, FaSave, FaTag, } from 'react-icons/fa';
import './Sidebar.css';

export default function Sidebar() {
    return (
        <div id='sidebar'>
            <div id='sidebar__main-links'>
                <div><FaHome style={{ fontSize: 16 }} />Home</div>
                <div><FaQuestionCircle style={{ fontSize: 16 }} />Questions</div>
                <div><FaTag style={{ fontSize: 16 }} /> Tags</div>
            </div>
            <div id='sidebar__sub-links'>
                <div><FaBookmark style={{ fontSize: 16 }} /> Saves</div>
            </div>
        </div>
    )
}