import { useState,useEffect } from "react"
import axios from "axios";

function App() {

    const[name,setName ] = useState("");
    const[course,setCourse] = useState("");
    const[students,setStudents] = useState([]);

    //Get students from the database
    const getStudents = async () => {
       
            const res = await axios.get("http://localhost:5000/students");
            setStudents(res.data);
    }

    //Add a student 
    const addStudent = async () => {
        await axios.post("http://localhost:5000/add",{
            name,
            course
        });
        getStudents();
        setName("");
        setCourse("");
    }

    //Delete a student
    const deleteStudent = async (id) => {
        await axios.delete(`http://localhost:5000/delete/${id}`);
        getStudents();
    }

    //Automatically get students when the page loads
    useEffect(() => {
        getStudents();
    },[])

    return (
        <div 
        style={{
        background:'skyblue',
        color:'black',
        padding:60,
        marginLeft:630,
        border:'6px solid',
        borderColor:'gray',
        }}>


        <h1>Frontend 💙 Backend</h1>
        <label style={{fontSize:25}}><b>Name</b></label><br/>
        <input style ={{background:'white',padding:10,color:"black",fontSize:20}} placeholder="Enter Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} />
        <br/><br/>
        <label style={{fontSize:25}}><b>Course</b></label><br/>
        <input  style ={{background:'white',padding:10,color:"black",fontSize:20}} placeholder="Enter Course"
        value={course} 
        onChange={(e) => setCourse(e.target.value)} />
        <br/><br/>

        <button style={{fontSize:17}} onClick={addStudent}>Add Student</button>

        {students.map(s=>(
            <div key={s._id}>
                {s.name} - {s.course}
                <button style={{margin:20}} onClick={() => deleteStudent(s._id)}>Delete</button>
            </div>

        ))}


        </div>
    ) 
}

export default App
