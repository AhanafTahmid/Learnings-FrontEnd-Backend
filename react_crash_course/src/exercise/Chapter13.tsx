import {Routes, Route} from 'react-router-dom'
import {useParams} from 'react-router-dom'

const Pid = () => {
  const {id} = useParams<{id: string}>();
  return <div>Project ID: {id}</div>;
};

const Chapter13 = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<div>Home</div>} />
            <Route path="/about" element={<div>About</div>} />
            <Route path="/projects" element={<div>Projects</div>} />
            <Route path="/projects/:id" element={<Pid />} />
            <Route path="/contact" element={<div>Contact</div>} />
            <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>

    </div>
  )
}

export default Chapter13