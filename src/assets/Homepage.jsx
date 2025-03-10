import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';
function HomePage() {
    const navigate = useNavigate();

    const navigateToFormsPage = () => {
        navigate('/forms');
    };
    const navigateToDataPage = () => {
        navigate('/records');
    }
    const navigateToChart = () => {
        navigate('/chart');
    }
    const navigateToHotel =() =>{
        navigate('/hotels');
    }
    const [names, setNames] = useState([]);
    let dataFetched = null;
    fetch('https://fake-json-api.mock.beeceptor.com/users')
        .then(response => {
            if (!response.ok) {
                throw new Error('False response');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);

            dataFetched = data;
            const names = dataFetched.map(item => item.name);
            setNames(names);

        })
        .catch(error => {
            console.log(' error in fetching');
        })
    console.log('names are = ', names)
   return (
        <div style={{ textAlign: 'center', marginTop: '50px' }} className='homepagebody'>
            <header className='myname'>
                <h1>Neeraja Beena Sasidharan</h1>
            </header>
            <main className='mainintro'>
                <p className='selfintro'>
                    Experienced Software Developer with a demonstrated history of developing high-performance applications for the Finance
                    and Healthcare industry, adhering to stringent technical standards. Dedicated to advancing organizational goals through
                    innovative solutions, and skilled in translating complex business requirements into intuitive web applications that streamline
                    new business processes.
                </p>
                <button onClick={navigateToFormsPage} style={{ padding: '10px 20px', fontSize: '16px' }}>
                    Forms Page
                </button>
                <button onClick={navigateToDataPage} style={{ padding: '10px 20px', fontSize: '16px' }}>
                    Records
                </button>
                <button onClick={navigateToChart} style={{ padding: '10px 20px', fontSize: '16px' }}>
                    Internet Speed
                </button>
                
                
                
            </main>
        </div>
    );
}

export default HomePage;
