import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF8C00', '#FF1493'];

export default function DashboardComponent() {
  const [flightData, setFlightData] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [bookings, setBookings] = useState([]);
  const [airlineNames, setAirlineNames] = useState([]);
  const [bookingAirlines, setBookingAirlines] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [averagePrice, setAveragePrice] = useState(0.0);
  const [dataRevenue, setDataRevenue] = useState([]);
  const [lastMonthBookings, setLastMonthBookings] = useState(0);
  const [monthlyCounts, setMonthlyCounts] = useState(Array(12).fill(0));
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/flight/get-flights/?limit=1000`);
        const data = await res.json();
        if (res.ok) {
          setFlightData(data.flights);
          countFlightsByMonth(data.flights);
          
          const pieData = data.flightsByAirline.map(flight => ({
            name: flight.airline,
            value: flight.totalFlights
          }));
          setPieData(pieData);

          const dataRevenue = data.revenueByAirline.map(flight => ({
            name: flight.airline,
            value: flight.totalRevenue
          }));
          setDataRevenue(dataRevenue);
          setAveragePrice(data.averagePrice);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchUsers = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/user/get-users');
        const data = await res.json();
        if (res.ok) {
          setTotalUsers(data.totalUsers);
        } else {
          console.log('Failed to fetch data', data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchBooking = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/booking/get-bookings');
        const data = await res.json();
        if (res.ok) {
          setBookings(data.bookings);
          setLastMonthBookings(data.lastMonthBookings);
        } else {
          console.log('Failed to fetch data', data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    // const fetchBookingWithAirline = async () => {
    //   try {
    //     const res = await fetch('http://localhost:3000/api/booking/get-bookings-airline');
    //     const data = await res.json();
    //     if (res.ok && Array.isArray(data.bookings)) {
    //       setBookingAirlines(data.bookings);
    //       const airlines = data.bookings.map((booking) => booking.flight?.airline).filter(Boolean);
    //       setAirlineNames(airlines);

    //       const airlineCounts = {};
    //       airlines.forEach((airline) => {
    //         airlineCounts[airline] = (airlineCounts[airline] || 1) + 1;
    //       });

    //       const formattedData = Object.entries(airlineCounts).map(([name, value]) => ({
    //         name,
    //         value,
    //       }));
    //       setPieData(formattedData);
    //     } else {
    //       console.log('Failed to fetch data', data.message);
    //     }
    //   } catch (error) {
    //     console.log(error.message);
    //   }
    // };

    if (currentUser.isAdmin) {
      fetchUsers();
      fetchFlights();
      fetchBooking();
      //fetchBookingWithAirline();
    }
  }, [currentUser.isAdmin]);

  const countFlightsByMonth = (flights) => {
    const counts = Array(12).fill(0);
    flights.forEach((flight) => {
      const date = new Date(flight.date);
      const month = date.getUTCMonth();
      if (!isNaN(date.getTime())) {
        counts[month] += 1;
      } else {
        console.error('Invalid date:', flight.date);
      }
    });
    setMonthlyCounts(counts);
  };

  const renderCustomizedLabel = ({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`;

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const monthlyCount = monthlyCounts.map((count, index) => ({
    month: monthNames[index],
    count,
  }));

  console.log(dataRevenue)

  return (
    <div className='dashboard-container'>
      <div className='stats-section'>
        <div className='stat-card'>
          <div className='stat-title'>Total Users Registered</div>
          <div className='stat-value'>{totalUsers}</div>
        </div>
        <div className='stat-card'>
          <div className='stat-title'>Last Month Bookings</div>
          <div className='stat-value'>{lastMonthBookings}</div>
        </div>
        <div className='stat-card'>
          <div className='stat-title'>Average Flights Price</div>
          <div className='stat-value'>{averagePrice}</div>
        </div>
      </div>
    <div className='flex flex-row w-full gap-4 h-auto'>
      <div className='chart-section'>
        <h2 className='chart-title'>Monthly Flight Bookings</h2>
        <ResponsiveContainer width='100%' height={300}>
          <BarChart data={monthlyCount}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='month' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey='count' fill='#8884d8' />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className='chart-section'>
      <h2 className='chart-title'>Bookings by Airlines</h2>
      {pieData.length > 0 ? (
        <ResponsiveContainer width='100%' height={400}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey='value'
              nameKey='name'
              cx='50%'
              cy='50%'
              outerRadius={100}
              label={renderCustomizedLabel}  // Display customized label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p>No data available for the pie chart.</p>
      )}
    </div>
    <div className='chart-section'>
      <h2 className='chart-title'>Revenue by Airlines</h2>
      {dataRevenue.length > 0 ? (
        <ResponsiveContainer width='100%' height={400}>
          <LineChart data={dataRevenue}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" label={{ value: 'Airline', position: 'insideBottomRight', offset: -10 }} />
            <YAxis label={{ value: 'Revenue', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p>No data available for the line chart.</p>
      )}
    </div>
    </div>

      <style jsx>{`
  .dashboard-container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: linear-gradient(135deg, #00aaff, #9b59b6);
  font-family: 'Arial', sans-serif;
  height: 100vh;
  overflow-y: auto;
}

.stats-section {
  display: flex;
  justify-content: space-around;
  gap: 10px;
  flex-wrap: wrap; 
}

.stat-card {
  background: white;
  padding: 20px;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: calc(33.33% - 20px);
  min-width: 200px;
}

.chart-section {
  background: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  flex: 1;
}

.chart-title {
  font-size: 20px; /* Reduced font size */
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.stat-title {
  font-weight: bold;
}

.stat-value {
  font-size: calc(24px + 1.5vw);
  font-weight: bold;
  color: #8857da;
}

.chart-title {
  font-size: 15px;  
}


`}</style>

    </div>
  );
}
