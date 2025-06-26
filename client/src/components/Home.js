import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { NavLink } from 'react-router-dom'
import moment from 'moment'
import Alert from 'react-bootstrap/Alert'

const Home = () => {
  
  const [data,setData] = useState([])
  // console.log(data)
  
  const [show,setShow] = useState(false)

  const getUserData =async()=> {
    const res = await axios.get("/getdata",{
      headers: {
        'Content-Type': 'application/json'
      }
    });
    // console.log(res.data.getUser)

    if(res.data.status===401 || !res.data) {
      console.log("Error")
    } else {
      setData(res.data.getUser)
    }

  }

  useEffect(()=>{
    getUserData()
  },[])

  const dltUser = useCallback(async(id)=> {
    const res = await axios.delete(`/${id}`,{
      headers: {
        'Content-Type': 'application/json'
      }
    });
    // console.log(res.data.getUser)

    if(res.data.status===401 || !res.data) {
      console.log("Error")
    } else {
      // window.location.reload()
      console.log("user delete")
      setShow(true)
    }
    getUserData();
  }, [])

  useEffect(()=>{
    getUserData()
  },[dltUser])

  

  return (
    <>
    {
      show ? <Alert variant='danger' onClose={()=>setShow(false)} dismissible>
        User Delete
      </Alert> : ""
    }
      <div className='container mt-3'>
        <h1 className='text-center mt-2' style={{fontWeight:700,fontFamily:"sans-serif"}}>MERN Image Upload Projects</h1>
        <div className='text-end'>
            <Button variant='primary'><NavLink to="/register" className="text-decoration-none text-light"> Add User </NavLink></Button>
        </div>

        <div className='row d-flex justify-content-between align-iteams-center mt-5'>
        {/* <Card style={{ width: '22rem',height:"20rem" }} className='mb-5'>
            <Card.Img variant="top" style={{ width: '150px',textAlign:"center",margin:"auto"}} src="/user-1.jpeg" className='mt-2' />
            <Card.Body className='text-center'>
                <Card.Title>Username : Karim</Card.Title>
                <Card.Text>
                Data Added :12/08/2022
                </Card.Text>
                <Button variant="danger" className='col-lg-6 text-center'>Delete</Button>
            </Card.Body>
       </Card>

       <Card style={{ width: '22rem',height:"20rem" }} className='mb-5'>
            <Card.Img variant="top" style={{ width: '150px',textAlign:"center",margin:"auto"}} src="/user-1.jpeg" className='mt-2' />
            <Card.Body className='text-center'>
                <Card.Title>Username : Karim</Card.Title>
                <Card.Text>
                Data Added :12/08/2022
                </Card.Text>
                <Button variant="danger" className='col-lg-6 text-center'>Delete</Button>
            </Card.Body>
       </Card>

       <Card style={{ width: '22rem',height:"20rem" }} className='mb-5'>
            <Card.Img variant="top" style={{ width: '150px',textAlign:"center",margin:"auto"}} src="/user-1.jpeg" className='mt-2' />
            <Card.Body className='text-center'>
                <Card.Title>Username : Karim</Card.Title>
                <Card.Text>
                Data Added :12/08/2022
                </Card.Text>
                <Button variant="danger" className='col-lg-6 text-center'>Delete</Button>
            </Card.Body>
       </Card> */}
       {
          data.length > 0 ? data.map((ele,i)=>{
            return (
              <>
                <Card key={i} style={{ width: '22rem',height:"20rem" }} className='mb-5'>
              <Card.Img variant="top" style={{ width: '150px',textAlign:"center",margin:"auto"}} src={`/uploads/${ele.imgpath}`} className='mt-2' />
              <Card.Body className='text-center'>
                  <Card.Title>UserName : {ele.fname}</Card.Title>
                  <Card.Text>
                    {/* Date Added : {moment(ele.date).format('YYYY-MM-DD')} */}
                    Date Added : {moment(ele.date).format('l')}
                  </Card.Text>
                  <Button variant="danger" className='col-lg-6 text-center' onClick={()=>dltUser(ele._id)}>Delete</Button>
              </Card.Body>
              </Card>

              </>
            )
          }) : ""
        
        }
       
        </div>
      </div>
    </>
  )
}

export default Home
