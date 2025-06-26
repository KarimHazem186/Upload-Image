import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
const Register = () => {
    const [fname,setFName] = useState("");
    // console.log(fname)
    
    const [file,setFile] = useState("")
    
    const history = useNavigate()
    
    // console.log(file)
    // const setdata = (e)=> {
    //     const {name,value} = e.target
    //     setFName((preve)=>{
    //         return {
    //             ...preve,
    //             [name]:value
    //         }
    //     })
    // }
    // console.log("FName",fname)
    ///////////////////////////
    const setdata = (e)=> {
        const {value} = e.target
        setFName(value)
    }
    // console.log("FName",fname)

    const setimgfile = (e)=> {
        // console.log(e.target.files[0])
        const value =e.target.files[0]
        setFile(value)
        // console.log(value)
    }

    // adduser data
    const addUserData = async(e)=> {
      e.preventDefault()
      var formData = new FormData();
      formData.append("photo",file)
      formData.append("fname",fname)

      const config = {
        headers:{
          "Content-Type": "multiport/form-data"
        }
      }

      const res = await axios.post("/register",formData,config)

      console.log(res)

      if(res.data.status===401 || !res.data) {
        console.log("Error")
      } else {
        history("/")
      }

    }

    return (
    <>
      <div className='container mt-3'>
        <h1 style={{fontWeight:"800px",fontFamily:""}}>Upload Your Img Here</h1>
        
    <Form className='mt-3' style={{fontWeight:"600px"}}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>UserName</Form.Label>
        <Form.Control type="text" name='fname' placeholder="" onChange={setdata} />
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Select Your Image</Form.Label>
        <Form.Control type="file" name='photo' placeholder=""  onChange={setimgfile}/>
      </Form.Group>
      
      <Button variant="primary" type="submit" onClick={addUserData}>
        Submit
      </Button>
    </Form>
      </div>
    </>
  )
}

export default Register
