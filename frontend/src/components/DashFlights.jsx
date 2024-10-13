import { Button, Modal, Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux';
import {HiOutlineExclamationCircle} from 'react-icons/hi';
import { Link } from 'react-router-dom';

export default function DashFlights() {
  const { currentUser } = useSelector((state) => state.user);
  const [userFlights, setUserFlights] = useState([]); 
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  useEffect(()=>{
    const fetchFlights = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/flight/get-flights?userId=${currentUser.reg_id}`)
        const data = await res.json();
        if(res.ok){
          setUserFlights(data.flights);
          if(data.flights.length < 9 ){
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    if(currentUser.isAdmin){
      fetchFlights();
    }
  }, [currentUser._id]);
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && userFlights.length > 0 ? (
        <>
        <Table hoverable className='shadow-md'>
          <Table.Head>
            <Table.HeadCell>Flight Id</Table.HeadCell>
            <Table.HeadCell>Airline</Table.HeadCell>
            <Table.HeadCell>Date</Table.HeadCell>
            <Table.HeadCell>Source</Table.HeadCell>
            <Table.HeadCell>Destination</Table.HeadCell>
            <Table.HeadCell>Route</Table.HeadCell>
            <Table.HeadCell>Departure Time</Table.HeadCell>
            <Table.HeadCell>Arrival Time</Table.HeadCell>
            <Table.HeadCell>Total Stops</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>
              <span>Delete</span>
            </Table.HeadCell>
            <Table.HeadCell>
              <span>Edit</span>
            </Table.HeadCell>
          </Table.Head>
          {userFlights.map((flight)=>(
            <Table.Body className='divide-y'>
              <Table.Row className='bg-white'>
              <Table.Cell>
                  <Link className='font-medium text-gray-900 dark:text-white' to={`/flight/${flight.flightId}`}>{flight.flightId}</Link>
                </Table.Cell>
                <Table.Cell>{flight.airline}</Table.Cell>
                <Table.Cell>{new Date(flight.date).toLocaleDateString()}</Table.Cell>
                <Table.Cell>{flight.source}</Table.Cell>
                <Table.Cell>{flight.destination}</Table.Cell>
                <Table.Cell>{flight.route}</Table.Cell>
                <Table.Cell>{flight.dep_time}</Table.Cell>
                <Table.Cell>{flight.arrival_time}</Table.Cell>
                <Table.Cell>{flight.no_of_stops}</Table.Cell>
                <Table.Cell>{flight.price}</Table.Cell>
                <Table.Cell>
                  <span onClick={()=>{
                    setShowModal(true);
                    // setflightIdToDelete(flight._id);
                  }} className='font-medium text-red-500 hover:underline cursor-pointer'>
                    Delete
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <Link className='text-teal-500 hover:underline' to={`/update-flight/${flight._id}`}>
                  <span>
                    Edit
                  </span>
                  </Link>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          ))}
        </Table>
        {
          showMore && (
            <button /*onClick={handleShowMore}*/ className='w-full text-teal-500 self-center text-sm py-7'>
              Show More
            </button>
          )
        }
        </>
      ):(
        <p>You have no flights yet</p>
      )}
      <Modal show={showModal} 
        onClose={() => setShowModal(false)} 
        popup 
        size='md'
        className='bg-opacity-30'>
          <Modal.Header />
          <Modal.Body>
            <div className='text-center'>
              <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
              <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete this flight?</h3>
              <div className='flex justify-center gap-4'>
                <Button color='failure' /*onClick={handleDeleteflight}*/>Yes, I'm sure</Button>
                <Button color='gray' onClick={() => setShowModal(false)}>No, cancle</Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
    </div>
  )
}
