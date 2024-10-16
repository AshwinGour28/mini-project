import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import {BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip,Legend, ResponsiveContainer,} from 'recharts';

export default function DashboardComponenet() {

  const [flightData, setFlightData] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [bookings , setBookings] = useState([]);
  const [lastMonthBookings, setLastMonthBookings] = useState(0);
  const [monthlyCounts, setMonthlyCounts] = useState(Array(12).fill(0));
  const {currentUser} = useSelector((state)=> state.user);

  useEffect(()=>{
    const fetchFlights = async () => {
        try {
          const res = await fetch(`http://localhost:3000/api/flight/get-flights`)
          const data = await res.json();
          if(res.ok){
            setFlightData(data.flights);
            countFlightsByMonth(data.flights);
          }
        } catch (error) {
          console.log(error.message);
        }
    } 
      const fetchUsers = async ()=>{
        try{
            const res = await fetch('http://localhost:3000/api/user/get-users')
            const data = await res.json();
            if(res.ok){
                setTotalUsers(data.totalUsers);
            }
            else{
                console.log('Failed to fetch data', data.message)
            }
        }catch(error){
            console.log(error.message)
        }
      }
      const fetchBooking = async () =>{
        try {
          const res = await fetch('http://localhost:3000/api/booking/get-bookings')
          const data = await res.json();
          if(res.ok){
            setBookings(data.bookings);
            setLastMonthBookings(data.lastMonthBookings)
          }
          else{
            console.log('Failed to fetch data', data.message)
        }
        } catch (error) {
          console.log(error.message)
        }
       }
      if(currentUser.isAdmin){
        fetchUsers();
        fetchFlights();
        fetchBooking();
      }
   }, [currentUser.isAdmin]);

   
   const countFlightsByMonth = (flights) => {
    const counts = Array(12).fill(0);

    flights.forEach(flight => {
        const date = new Date(flight.date); 
        const month = date.getUTCMonth(); 

        if (!isNaN(date.getTime())) { 
            counts[month] += 1; 
        } else {
            console.error("Invalid date:", flight.date); 
        }
    });

    setMonthlyCounts(counts); 
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"]
  const monthlyCount = monthlyCounts.map((count, index) => ({
  month: monthNames[index],
  count: count
  }));
  return (
    <div className='flex flex-col justify-center items-center mt-5 gap-4'>
      <div className='flex flex-row items-center justify-center gap-32'>
      <div className='flex flex-col justify-center items-center rounded-xl font-bold  p-8 bg-cyan-600'>
          <div className='text-white text-xl font-semibold'>
              Total Users registered
          </div> 
          <div className='font-bold text-4xl text-white'>
              {totalUsers}
          </div>
      </div>
      <div className='flex flex-col justify-center items-center rounded-xl font-bold  p-8 bg-cyan-600'>
          <div className='text-white text-xl font-semibold'>
              Last Month Bookings
          </div> 
          <div className='font-bold text-4xl text-white'>
              {lastMonthBookings}
          </div>
      </div>
      </div>
      <BarChart width={730} height={250} data={monthlyCount}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
