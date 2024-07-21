import { useNavigate } from 'react-router-dom';
import InfoMenuButton from './InfoMenuButton';
import './Footer.css';

const gitData = [
    {
        name: 'Harry Wagner',
        link: 'https://github.com/Big-Hdub'
    },
    {
        name: 'Pushpinder Singh',
        link: 'https://github.com/Sohna-AI'
    },
    {
        name: 'Forest Briggs',
        link: 'https://github.com/Forestbriggs'
    }
];
const linkData = [
    {
        name: 'Harry Wagner',
        link: 'https://www.linkedin.com/in/harry-wagner-7784a0123/'
    },
    {
        name: 'Pushpinder Singh',
        link: 'https://www.linkedin.com/in/pushpinder-s-03219b125/'
    },
    {
        name: 'Forest Briggs',
        link: 'https://www.linkedin.com/in/forest-briggs/'
    }
];

export default function Footer() {
    const navigate = useNavigate();

    const handleClick = (path) => {
        window.scroll(0, 0)
        navigate(path)
    }

    return (
        <footer>
            <div>
                <div id='site_links'>
                    <div>
                        <p onClick={() => handleClick('/')}>Q-Understack</p>
                        <div id='sub_links'>
                            <p onClick={() => handleClick('/questions')}>Questions</p>
                            <p onClick={() => window.alert('Comming soon!')}>Help</p>
                        </div>
                    </div>
                    <p onClick={() => window.alert('Comming soon!')}>About</p>
                    <p onClick={() => window.alert('Comming soon!')}>Contact Us</p>
                </div>
                <div id='social_links' className='flex gap-15'>
                    <div className='flex column'>
                        <InfoMenuButton text="GitHub" data={gitData} ></InfoMenuButton>
                    </div>
                    <div className='flex column'>
                        <InfoMenuButton text="Linkedin" data={linkData} ></InfoMenuButton>
                    </div>
                </div>
            </div>
        </footer>
    )
}
