import { BrowserView, MobileView } from 'react-device-detect'
import { Route, Routes, useOutletContext } from 'react-router-dom';
import './App.css';
import Main from './ComponentsBrowser/DashBoard/Main/mainDash'
import MainT from './ComponentsBrowser/DashBoard/Main/mainDashT'
import Layout from './ComponentsBrowser/DashBoard/Layout/Layout';
import Wcalendar from './ComponentsBrowser/DashBoard/Calendar/calendar';
import Moodle from './ComponentsBrowser/DashBoard/Moodle/moodle';
import MoodleT from './ComponentsBrowser/DashBoard/Moodle/Specials/moodleT';
import Feedb from './ComponentsBrowser/DashBoard/Feed/Feedb';
import Login from './ComponentsBrowser/LoginSignup/LoginSignup'
import { useState } from 'react';
function App() {
  const [state, setState] = useState(0)
  const [rank, setRank] = useState(0)
  return (
    <>
      <BrowserView>
        {state === 0 ?
          <Login setState={setState} setRank={setRank} />
          :
          <>{rank === 3 ?
            <Routes>
              <Route path='/' element={<Layout setState={setState}/>} >
                <Route index element={<Main setState={setState}/>} />
                <Route path='/dash' element={<Main />} />
                <Route path='/calendar' element={<Wcalendar setState={setState}/>} />
                <Route path='/Moodle' element={<Moodle />} />
                <Route path='/Feed' element={<Feedb />} />
              </Route>
            </Routes>
            :
            <Routes>
              <Route path='/' element={<Layout setState={setState}/>} >
                <Route index element={<MainT setState={setState}/>} />
                <Route path='/dash' element={<MainT />} />
                <Route path='/calendar' element={<Wcalendar setState={setState}/>} />
                <Route path='/Moodle' element={<MoodleT setState={setState}/>} />
                <Route path='/Feed' element={<Feedb />} />
              </Route>
            </Routes>
          }</>
        }
      </BrowserView>
      <MobileView>
        <div>
          hello mobile
        </div>
      </MobileView>
    </>
  );
}

export default App;
