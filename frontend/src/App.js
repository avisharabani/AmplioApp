import './App.css'
import LoadingIndicator from './components/loadingIndicator';
import { loadingStatus } from './helpers';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SingleQuestionWrapper from './components/singleQuestionWrapper'
import Home from './pages/Home'

const App = () => {

  console.log('before render App')
  return (
    <BrowserRouter>
      <Routes>
        <Route path='questions/:questionId' element={<SingleQuestionWrapper />}/>
        <Route path='/' element={<Home />}/>
        <Route path='*' element={<LoadingIndicator loadingState={loadingStatus.hasErrored} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

